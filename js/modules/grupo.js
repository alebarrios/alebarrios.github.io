/** Clase que representa un Grupo donde se registran gastos. */
export default class Grupo {
    #nombre;
    #integrantes;
    #saldos;

    /**
     * Crea un objeto tipo Grupo.
     * @param {string} _nombre - el nombre del Grupo.
     */
    constructor(_nombre){
        this.#nombre = _nombre;
        this.#saldos = new Map();
        this.#integrantes = [];
    }

    /**
     * Agrega un nuevo Integrante al grupo. Se recalculan los saldos de todos los integrantes.
     * @param {IntegranteGrupo} _integrante - el nuevo integrante a agregar.
     */
    agregarIntegrante(_integrante){
        //console.log(`Agregando integrante ${_integrante.getPersona().getNombre()}`);

        if(this.#saldos.has(_integrante)) {
            console.log("Integrante ya existe en el grupo");
            return;
        };

        this.#saldos.set(_integrante,0);
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
        if(!this.#saldos.has(_integrante)){
            console.log("Integrante no existe.");
            return;
        };

        if(_gasto.getImporte() <= 0){ 
            console.log("El importe no puede ser negativo");
            return; 
        };

        _integrante.agregarGasto(_gasto);
        this.#saldos.set(_integrante, this.#saldos.get(_integrante) + _gasto.getImporte());
        
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
            this.#saldos.set(integrante,integrante.getGastoTotal());
        });
        //console.log(`Gastos totales: ${gastosTotales}`);

        const saldoARepartir = parseFloat(gastosTotales / this.#integrantes.length);
        //console.log(`Saldo a repartir: ${saldoARepartir}`);

        this.#integrantes.forEach((integrante) =>{
            let saldo = this.#saldos.get(integrante) - saldoARepartir;
            //console.log(`Saldo a asignar: ${saldo}`);
            this.#saldos.set(integrante,saldo);
        });

    }

    /**
     * Devuelve un Array string con los saldos de todos los integrantes del grupo.
     */
    calcularSaldos(){
        //console.log(`Estos son los saldos del grupo: ${this.#nombre}`);
        let arraySaldos = [];
        this.#integrantes.forEach((integrante) => {
            arraySaldos.push(`El saldo de ${integrante.getPersona().getNombre()} es de ${integrante.getSaldo().toFixed(2)} pesos.`);
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
        //Creo un Array con los saldos de los integrantes ordenados ascendentemente.
        let integrantes = new Array([...this.#saldos.entries()].sort((a, b) => a[1] - b[1]));
        integrantes = integrantes[0];

        //mientras existan integrantes que tengan saldo negativo...
        let deudor = integrantes.shift(); //Remuevo y tomo el primer Integrante del array. [Integrante,saldo]
        let arrayDeudas = [];

        while(deudor[1] < 0){ //mientra haya deudores...
            const nombreDeudor = deudor[0].getPersona().getNombre();
            //console.log(`Deudor ${nombreDeudor} tiene inicialmente una deuda de ${deudor[1]}`);
            //itero sobre los integrantes que tienen mas saldo a favor hacia el menor
            for (let j = integrantes.length - 1; j >= 0; j--) {
                const integrante = integrantes[j];
                const nombreIntegrante = integrante[0].getPersona().getNombre();
                //console.log(`Tomo integrante ${nombreIntegrante} que tiene un saldo de ${integrante[1]}`);
                if(integrantes[j][1] > 0){ //si el otro integrante tiene saldo a favor...
                    const saldoAFavor = integrante[1];
                    const deuda = (deudor[1] * -1);
                    if(deuda - saldoAFavor > 0 ) {
                        //El deudor sigue moroso, se salda la deuda con el otro integrante.
                        deudor[1] += saldoAFavor;
                        integrantes[j][1] = 0;
                        let mensajeDeuda = `${nombreDeudor} le debe a ${nombreIntegrante} : ${saldoAFavor.toFixed(2)} pesos`;
                        //console.log(newMensaje);
                        arrayDeudas.push(mensajeDeuda);
                    } else{
                        //El deudor deja de estar moroso, pero el otro integrante aun tiene saldo a favor (o cero).
                            deudor[1] = 0;
                            integrantes[j][1] = saldoAFavor - deuda;
                            let mensajeDeuda = `${nombreDeudor} le debe a ${nombreIntegrante} : ${deuda.toFixed(2)} pesos`;
                            //console.log(newMensaje);
                            arrayDeudas.push(mensajeDeuda);
                            break;
                    }
                };
            };
            //console.log(`La Deuda de ${nombreDeudor} quedó en ${deudor[1]}`);
            //if(deudor[1] <= 0) { // si el deudor ya saldó su deuda..
                deudor = integrantes.shift(); //Remuevo y tomo el nuevo deudor.
            //};
            
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
        return parseFloat(this.#saldos.get(_integrante));
    }
};