
export default class IntegranteGrupo {
    #persona;
    #gastos;
    //#saldo;
    #grupo;

    constructor(_persona, _grupo){
        this.#persona = _persona;
        this.#gastos = [];
        this.#grupo = _grupo;
        this.#grupo.agregarIntegrante(this);
    }

    agregarGasto(_nuevoGasto){
        this.#gastos.push(_nuevoGasto);
    }

    getGastoTotal(){
        let importeTotal = 0;
        this.#gastos.forEach( (gasto) => {
            importeTotal += gasto.getImporte();
        });
        console.log(`Gasto Total de ${this.#persona.getNombre()} es ${importeTotal}`);
        return importeTotal;
    }

    getSaldo(){
        return this.#grupo.getSaldo(this);
    }

    getPersona(){
        return this.#persona;
    }
};