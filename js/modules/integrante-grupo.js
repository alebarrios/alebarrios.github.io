import Gasto, {TipoGasto} from "./gasto.js";

/** Clase que representa un Integrante de un Grupo. */
export default class IntegranteGrupo {
    #id;
    #persona;
    #gastos;
    //#grupo;

    /**
     * Crea un objeto tipo IntegranteGrupo.
     * @param {Persona} _persona - la persona integrante.
     */
    constructor(_persona){
        this.#persona = _persona;
        this.#gastos = [];
        //this.#grupo = _grupo;
        //this.#grupo.agregarIntegrante(this);
    }

    static from({idIntegrante, personaIntegrante, gastosIntegrante}) {
        const nuevoIntegrante = new IntegranteGrupo(personaIntegrante);
        gastosIntegrante.forEach( (gastoObj) => {
            const gasto = Gasto.from(gastoObj);
            nuevoIntegrante.agregarGasto(gasto);
        });
        
        return nuevoIntegrante;
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
        //console.log(`Gasto Total de ${this.#persona.getNombre()} es ${importeTotal}`);
        return importeTotal;
    }

    /**
     * Devuelve el saldo actual del integrante.
     * @return {number} el saldo actual.
     */
/*     getSaldo(){
        return this.#grupo.getSaldo(this);
    } */

    /**
     * Devuelve la persona del integrante.
     * @return {Persona} la persona.
     */
    getPersona(){
        return this.#persona;
    }

    /**
    * Retorna un string en formato JSON con los datos de la Integrante.
    * @return {string} el Integrante en formato JSON.
    */
        getJSON(){
            const obj = {
                idIntegrante: this.#id,
                personaIntegrante: JSON.parse(this.#persona.getJSON()),
                gastosIntegrante: this.#gastos.map((item) => JSON.parse(item.getJSON()))
            };
            return JSON.stringify(obj);
        }
};