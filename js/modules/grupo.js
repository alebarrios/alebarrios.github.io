import IntegranteGrupo from "./integrante-grupo.js";

export const TipoGrupo = {
    VIAJE : Symbol("viaje"),
    AMIGOS : Symbol("amigos"),
    PAREJA : Symbol("pareja"),
    OTROS : Symbol("otros")
}

/** Clase que representa un Grupo donde se registran gastos. */
export default class Grupo {
    #id;
    #nombre;
    #integrantes;
    #saldos;
    #tipoGrupo;

    /**
     * Crea un objeto tipo Grupo.
     * @param {string} _nombre - el nombre del Grupo.
     */
    constructor(_id , _nombre, _tipoGrupo = TipoGrupo.OTROS){
        this.#id = _id;
        this.#nombre = _nombre;
        this.#saldos = new Map();
        this.#integrantes = [];
        this.#tipoGrupo = _tipoGrupo;
    }

    static from({idGrupo, nombreGrupo, integrantes}) {
        const nuevoGrupo = new Grupo(idGrupo, nombreGrupo);
        integrantes.forEach((integrante) => {
            const nuevoIntegrante = IntegranteGrupo.from(integrante);
            nuevoGrupo.agregarIntegrante(nuevoIntegrante);
        })
        return nuevoGrupo;
    }

    static makeEnum(_string){
        switch (_string) {
            case "viaje":
                return TipoGrupo.VIAJE;
            case "amigos":
                return TipoGrupo.AMIGOS;
            case "pareja":
                return TipoGrupo.PAREJA;
            default:
                return TipoGrupo.OTROS;   
        }
    }

    /**
     * Agrega un nuevo Integrante al grupo. Se recalculan los saldos de todos los integrantes.
     * @param {IntegranteGrupo} _integrante - el nuevo integrante a agregar.
     */
    agregarIntegrante(_integrante){

        if(this.#saldos.has(_integrante.getId())) {
            console.log("Integrante ya existe en el grupo");
            return;
        };

        this.#saldos.set(_integrante.getId(),0);
        this.#integrantes.push(_integrante);

      this.#recalcularSaldos();
    }

    /**
     * Registra un nuevo gasto al grupo. Se recalculan los saldos de todos los integrantes.
     * @param {Gasto} _gasto - el nuevo gasto a registrar.
     * @param {IntegranteGrupo} _integrante - el integrante que registra el gasto.
     */
    registrarNuevoGasto(_gasto,_integrante){
        //console.log("registrando gasto");
        if(!this.#saldos.has(_integrante.getId())){
            console.log("Integrante no existe.");
            return;
        };

        if(_gasto.getImporte() <= 0){ 
            console.log("El importe no puede ser negativo");
            return; 
        };

        _integrante.agregarGasto(_gasto);
        this.#saldos.set(_integrante.getId(), this.#saldos.get(_integrante.getId()) + _gasto.getImporte());
        
        this.#recalcularSaldos();
    }

    /**
     * Recalcula los saldos de todos los integrantes.
     */
    #recalcularSaldos(){
        //console.log("Recalculando saldos...");
        this.#saldos.clear();

        let gastosTotales = 0;
        this.#integrantes.forEach((integrante) =>{
            gastosTotales += integrante.getGastoTotal();
            //console.log(`Asignando a: ${integrante.getPersona().getNombre()} ${integrante.getGastoTotal()}`);
            this.#saldos.set(integrante.getId(),integrante.getGastoTotal());
        });
        //console.log(`Gastos totales: ${gastosTotales}`);

        const saldoARepartir = parseFloat(gastosTotales / this.#integrantes.length);
        //console.log(`Saldo a repartir: ${saldoARepartir}`);

        this.#integrantes.forEach((integrante) =>{
            let saldo = this.#saldos.get(integrante.getId()) - saldoARepartir;
            //console.log(`Saldo a asignar: ${saldo}`);
            this.#saldos.set(integrante.getId(),saldo);
        });

    }

    /**
     * Devuelve un Array string con los saldos de todos los integrantes del grupo.
     */
    calcularSaldos(){
        //console.log(`Estos son los saldos del grupo: ${this.#nombre}`);
        let arraySaldos = [];
        this.#integrantes.forEach((integrante) => {
            arraySaldos.push(`El saldo de ${integrante.getPersona().getNombre()} es de ${this.#saldos.get(integrante.getId()).toFixed(2)} pesos.`);
            //console.log(arraySaldos);
            
        });

        //arraySaldos += '\n' + this.#calcularDeudasPendientes();
        //alert(mensaje);
        return arraySaldos;
    }

    /**
     * Devuelve un string con las deudas de todos los integrantes del grupo.
     */
    calcularDeudasPendientes(){
        //Creo un Array de 2 dimensiones con los saldos de los integrantes ordenados ascendentemente.
        //[[id,saldo],[id,saldo]]

        let integrantes = Object.entries(Object.fromEntries(this.#saldos)).sort((a, b) => a[1] - b[1]);
        integrantes = integrantes.map((i) => 
        {return [this.#integrantes.find((elem) => elem.getId() == i[0])?.getPersona().getNombre(),i[1]] });
        
        let deudor = integrantes.shift(); //Remuevo y tomo el primer Integrante del array. [Integrante,saldo]    
        let arrayDeudas = [];
        
        while(deudor[1] < 0){ //mientras existan integrantes que tengan saldo negativo...
            //itero sobre los integrantes que tienen mas saldo a favor hacia el menor
            for (let j = integrantes.length - 1; j >= 0; j--) {
                const integrante = integrantes[j];
                //console.log(`Tomo integrante ${nombreIntegrante} que tiene un saldo de ${integrante[1]}`);
                if(integrante[1] > 0){ //si el otro integrante tiene saldo a favor...
                    const saldoAFavor = integrante[1];
                    const deuda = (deudor[1] * -1);
                    if(deuda - saldoAFavor > 0 ) {
                        //El deudor sigue moroso, se salda la deuda con el otro integrante.
                        deudor[1] += saldoAFavor;
                        integrantes[j][1] = 0;
                        let mensajeDeuda = `${deudor[0]} le debe a ${integrante[0]} : ${saldoAFavor.toFixed(2)} pesos`;
                        //console.log(newMensaje);
                        arrayDeudas.push(mensajeDeuda);
                    } else{
                        //El deudor deja de estar moroso, pero el otro integrante aun tiene saldo a favor (o cero).
                            deudor[1] = 0;
                            integrantes[j][1] = saldoAFavor - deuda;
                            let mensajeDeuda = `${deudor[0]} le debe a ${integrante[0]} : ${deuda.toFixed(2)} pesos`;
                            //console.log(newMensaje);
                            arrayDeudas.push(mensajeDeuda);
                            break;
                    }
                };
            };
            //console.log(`La Deuda de ${nombreDeudor} quedó en ${deudor[1]}`);
            deudor = integrantes.shift(); //Remuevo y tomo el nuevo deudor.   
        };
        return arrayDeudas;
    }

    ordenarIntegrantesPorSaldo(){
        this.#integrantes.sort(this.#ordenGastoTotal);
    }

    #ordenGastoTotal(integranteA,integranteB){
        if(integranteA.getGastoTotal() > integranteB.getGastoTotal()) { return -1;} 
        if(integranteA.getGastoTotal() < integranteB.getGastoTotal()) { return -1;} 
        return 0;
    }

    /**
     * Obtiene un array de objectos con los Gastos de todos los Integrantes del Grupo.
     * @return {array} con todos los Gastos.
     */
        getGastos(){
            const gastos = [];
            this.#integrantes.forEach((integrante) => {
                integrante.getGastos().forEach( (gasto) => {
                    gastos.push({importe: gasto.getImporte(), nombreIntegrante: integrante.getPersona().getNombre()}); 
                });
            });
            return gastos;
        }

    /**
     * Obtiene el nombre del grupo.
     * @return {string} el nombre.
     */
    getNombre(){
        return this.#nombre;
    }

    /**
     * Obtiene el saldo de un Intengrante en particular.
     * @param {Integrante} _integrante - el integrante.
     * @return {string} el saldo del integrante.
     */
    getSaldo(_integrante){
        return parseFloat(this.#saldos.get(_integrante.getId()));
    }

    /**
    * Obtiene el Id del Grupo.
    * @return {number} el Id del Grupo.
    */
    getId(){
        return this.#id;
    }

    /**
    * Obtiene el array de Integrantes del Grupo.
    * @return {array} el array de Integrantes.
    */
    getIntegrantes(){
        return this.#integrantes;
    }

    getTipoGrupo(){
        return this.#tipoGrupo.description;
    }

    /**
    * Retorna un string en formato JSON con los datos del Grupo.
    * @return {string} el Grupo en formato JSON.
    */
    getJSON(){
        const obj = {
            idGrupo: this.#id,
            nombreGrupo: this.#nombre,
            integrantes: this.#integrantes.map((item) => JSON.parse(item.getJSON()))
        };
        return JSON.stringify(obj);
    }
};