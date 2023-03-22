/** Clase helper para encapsular la interacción con localStorage. */
export default class StorageHelper{
    #key;

    constructor(){
        this.#key = "userGroups";
    }

    guardar(_obj){
        localStorage.setItem(this.#key, JSON.stringify(_obj));
    }

    obtener(){
        return JSON.parse(localStorage.getItem(this.#key));
    }

    clear(){
        localStorage.clear();
    }
}