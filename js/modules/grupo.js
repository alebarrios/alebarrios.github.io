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
    #fechaGrupo;
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
        this.#fechaGrupo = new Date();
        this.#saldos = new Map();
        this.#integrantes = [];
        this.#tipoGrupo = _tipoGrupo;
    }

    static from({idGrupo, nombreGrupo, fechaGrupo, tipoGrupo, integrantes}) {
        const nuevoGrupo = new Grupo(idGrupo, nombreGrupo, this.makeEnum(tipoGrupo));
        nuevoGrupo.setFecha(fechaGrupo);
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
     * @param {Persona} persona - el nuevo integrante a agregar.
     * 
     */
    crearIntegrante(id,persona){

        if(this.#saldos.has(id)) {
            console.log("Integrante ya existe en el grupo");
            return;
        };
        
        const integrante = new IntegranteGrupo(id,persona);
        this.#saldos.set(id,0);
        this.#integrantes.push(integrante);
        this.#recalcularSaldos();
    }

    agregarIntegrante(integrante){

        if(this.#saldos.has(integrante.getId())) {
            console.log("Integrante ya existe en el grupo");
            return;
        };

        this.#saldos.set(integrante.getId(),0);
        this.#integrantes.push(integrante);
        this.#recalcularSaldos();
    }

    /**
     * Registra un nuevo gasto al grupo. Se recalculan los saldos de todos los integrantes.
     * @param {Gasto} gasto - el nuevo gasto a registrar.
     */
    registrarNuevoGasto(gasto){
        //console.log("registrando gasto");
        
        const integrante = this.#integrantes.find(integrante => gasto.getIdIntegrante() == integrante.getId());
        if(!integrante){
            console.log("Integrante no existe.");
            return;  
        }

        console.log(this.#saldos);
        
        if(!this.#saldos.has(gasto.getIdIntegrante())){
            console.log("Integrante no existe en lista de saldos.");
            return;
        };

        if(gasto.getImporte() <= 0){ 
            console.log("El importe no puede ser 0 o negativo");
            return; 
        };

        integrante.agregarGasto(gasto);
        this.#saldos.set(gasto.getIdIntegrante(), this.#saldos.get(gasto.getIdIntegrante()) + gasto.getImporte());
        
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
     * Obtiene un array con los Gastos de todos los Integrantes del Grupo.
     * @return {array} con todos los Gastos.
     */
    getGastos(){
        const arrayGastos = [];
        this.#integrantes.forEach((integrante) => {
            integrante.getGastos().forEach( (gasto) => {
                arrayGastos.push(gasto); 
            });
        });
        return arrayGastos;
    }

    /**
     * Devuelve la sumatoria de todos los gastos del Grupo.
     * @return {number} el importe total.
     */
    getGastoTotal(){
        let importeTotal = 0;
        this.#integrantes.forEach( (integrante) => {
            importeTotal += integrante.getGastoTotal();
        });
        //console.log(`Gasto Total de ${this.#persona.getNombre()} es ${importeTotal}`);
        return importeTotal;
    }

    /**
     * Obtiene el nombre del grupo.
     * @return {string} el nombre.
     */
    getNombre(){
        return this.#nombre;
    }

     /**
     * Obtiene la fecha de creación del grupo.
     * @return {Date} la fecha de creación.
     */
    getFecha(){
        return this.#fechaGrupo;
    }


    setFecha(fecha){
        this.#fechaGrupo = new Date(fecha);
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
            fechaGrupo: this.#fechaGrupo,
            tipoGrupo: this.#tipoGrupo.description,
            integrantes: this.#integrantes.map((item) => JSON.parse(item.getJSON()))
        };
        return JSON.stringify(obj);
    }
};