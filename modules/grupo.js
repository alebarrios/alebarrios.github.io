
export default class Grupo {
    #nombre;
    #integrantes;
    #saldos;

    constructor(_nombre){
        this.#nombre = _nombre;
        this.#saldos = new Map();
        this.#integrantes = [];
    }

    getNombre(){
        return this.#nombre;
    }

    getSaldo(_integrante){
        return this.#saldos.get(_integrante);
    }

    agregarIntegrante(_integrante){
        console.log(`Agregando integrante ${_integrante.getPersona().getNombre()}`);

        if(this.#saldos.has(_integrante)) {
            console.log("Integrante ya existe en el grupo");
            return;
        };

        this.#saldos.set(_integrante,0);
        this.#integrantes.push(_integrante);

      this.#recalcularSaldos();
    }

    registrarNuevoGasto(_gasto,_integrante){
        console.log("registrando gasto");
        if(!this.#saldos.has(_integrante)){
            console.log("Integrante no existe.");
            return;
        };
        _integrante.agregarGasto(_gasto);
        this.#saldos.set(_integrante, this.#saldos.get(_integrante) + _gasto.getImporte());
        
        this.#recalcularSaldos();
    }

    #recalcularSaldos(){
        console.log("Recalculando saldos...");
        this.#saldos.clear();

        let gastosTotales = 0;
        this.#integrantes.forEach((integrante) =>{
            gastosTotales += integrante.getGastoTotal();
            console.log(`Asignando a: ${integrante.getPersona().getNombre()} ${integrante.getGastoTotal()}`);
            this.#saldos.set(integrante,integrante.getGastoTotal());
        });
        console.log(`Gastos totales: ${gastosTotales}`);

        const saldoARepartir = parseFloat(gastosTotales / this.#integrantes.length);
        console.log(`Saldo a repartir: ${saldoARepartir}`);

        this.#integrantes.forEach((integrante) =>{
            let saldo = this.#saldos.get(integrante) - saldoARepartir;
            console.log(`Saldo a asignar: ${saldo}`);
            this.#saldos.set(integrante,saldo);
        });

    }

    #actualizarSaldos(_gasto){
        console.log(_gasto);
        //itera sobre integrantes y actualiza sus saldos.
        console.log("Actualizando saldos de integrantes...");

        let cantidadIntegrantes = this.#integrantes.length;
        if (cantidadIntegrantes == 0) {
            console.log("No hay integrantes en el grupo. No se pueden actualizar los saldos.");
            return;
        };
        
        this.#integrantes.forEach((integrante) => {
            
            integrante.restarSaldo(_gasto.getImporte() / cantidadIntegrantes);
        });
    }

    printSaldos(){
        console.log(`Estos son los saldos del grupo: ${this.#nombre}`);
        this.#integrantes.forEach((integrante) => {
            console.log(`El saldo de ${integrante.getPersona().getNombre()} es de ${integrante.getSaldo()} pesos.`);
        });
            
    }
};