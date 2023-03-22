/** Clase que representa una persona. */
export default class Persona {
    #id;
    #nombre;

    /**
     * Crea un objeto tipo Persona.
     * @param {string} _nombre - el nombre de la persona.
     */
    constructor(_nombre){
        this.#nombre = _nombre;
    }

    /**
     * Devuelve el nombre de la persona.
     * @return {string} el nombre.
     */
    getNombre(){
        return this.#nombre;
    }

    /**
    * Retorna un string en formato JSON con los datos de la Persona.
    * @return {string} la Persona en formato JSON.
    */
    getJSON(){
        const obj = {
            idPersona: this.#id,
            nombrePersona: this.#nombre,
        };
        return JSON.stringify(obj);
    }
                              
};