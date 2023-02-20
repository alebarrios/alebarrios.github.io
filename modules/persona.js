export default class Persona {
    #nombre;

    constructor(_nombre){
        this.#nombre = _nombre;
    }

    getNombre(){
        return this.#nombre;
    }
                              
};