import Gasto from "./gasto.js";
import Persona from "./persona.js";

/** Clase que representa un Integrante de un Grupo. */
export default class IntegranteGrupo {
    #id;
    #persona;
    #gastos;

    /**
     * Crea un objeto tipo IntegranteGrupo.
     * @param {Persona} _persona - la persona integrante.
     */
    constructor(_id, _persona){
        this.#persona = _persona;
        this.#gastos = [];
        this.#id = _id;
    }

    static from({idIntegrante, personaIntegrante, gastosIntegrante}) {
        const nuevoIntegrante = new IntegranteGrupo(idIntegrante, Persona.from(personaIntegrante));
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
     * Remueve un  gasto del integrante.
     * @param {number} id Gasto - el id del gasto a eliminar.
     */
    removerGasto(idGasto){
        this.#gastos.splice(this.#gastos.findIndex(elem => elem.getId() == idGasto),1);
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
     * Devuelve un array con los Gastos del integrante.
     * @return {array} todos los Gastos del Integrante.
     */
     getGastos(){
        return this.#gastos;
    } 

    /**
     * Devuelve la persona del integrante.
     * @return {Persona} la persona.
     */
    getPersona(){
        return this.#persona;
    }

    /**
     * Devuelve el Id del integrante.
     * @return {number} la persona.
     */
    getId(){
        return this.#id;
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