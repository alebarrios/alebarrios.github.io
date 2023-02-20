/** Clase que representa un Integrante de un Grupo. */
export default class IntegranteGrupo {
    #persona;
    #gastos;
    #grupo;

    /**
     * Crea un objeto tipo IntegranteGrupo.
     * @param {Persona} _persona - la persona integrante.
     * @param {Grupo} _grupo - el grupo a donde integrarse.
     */
    constructor(_persona, _grupo){
        this.#persona = _persona;
        this.#gastos = [];
        this.#grupo = _grupo;
        this.#grupo.agregarIntegrante(this);
    }

    /**
     * Agrega un nuevo gasto al integrante.
     * @param {Gasto} _nuevoGasto - el nuevo gasto a agregar.
     */
    agregarGasto(_nuevoGasto){
        this.#gastos.push(_nuevoGasto);
    }

    /**
     * Devuelve la sumatoria de todos los gastos del integrante.
     * @return {number} el importe total.
     */
    getGastoTotal(){
        let importeTotal = 0;
        this.#gastos.forEach( (gasto) => {
            importeTotal += gasto.getImporte();
        });
        console.log(`Gasto Total de ${this.#persona.getNombre()} es ${importeTotal}`);
        return importeTotal;
    }

    /**
     * Devuelve el saldo actual del integrante.
     * @return {number} el saldo actual.
     */
    getSaldo(){
        return this.#grupo.getSaldo(this);
    }

    /**
     * Devuelve la persona del integrante.
     * @return {Persona} la persona.
     */
    getPersona(){
        return this.#persona;
    }
};