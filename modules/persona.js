/** Clase que representa una persona. */
export default class Persona {
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
                              
};