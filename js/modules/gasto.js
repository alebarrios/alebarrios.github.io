
export const TipoGasto = {
    COMIDA : Symbol("comida"),
    COMBUSTIBLE : Symbol("combustible"),
    ALOJAMIENTO : Symbol("alojamiento"),
    VARIOS : Symbol("varios")
}

/** Clase que representa un gasto. */
export default class Gasto {
    #id;
    #importe;
    #fecha = {};
    #tipoGasto;

    /**
     * Crea un objeto tipo Gasto.
     * @param {number} _importe - el importe del gasto.
     * @param {string} _tipoGasto - el tipo de gasto.
     */
    constructor(_importe, _tipoGasto){
        this.#importe = parseFloat(_importe);
        this.#fecha = new Date();
        this.#tipoGasto = _tipoGasto;
    }

    static from({idGasto, importeGasto, fechaGasto, tipoGasto}){
        const nuevoGasto = new Gasto(importeGasto,tipoGasto);
        nuevoGasto.setFecha(fechaGasto);
        return nuevoGasto;
    }

    /**
     * Obtiene el importe del gasto.
     * @return {number} el importe.
     */
    getImporte(){
        return this.#importe;
    }

    /**
     * Obtiene la fecha del gasto.
     * @return {Date} fecha.
     */
    getFecha(){
        return this.#fecha;
    }

    setFecha(_fecha){
        this.#fecha = _fecha;
    }

    /**
     * Obtiene el tipo del gasto.
     * @return {string} el importe.
     */
    getTipoGasto(){
        return this.#tipoGasto;
    }

    /**
    * Retorna un string en formato JSON con los datos del Gasto.
    * @return {string} el Gasto en formato JSON.
    */
    getJSON(){
        const obj = {
            idGasto: this.#id,
            importeGasto: this.#importe,
            tipoGasto: this.#tipoGasto,
            fechaGasto: this.#fecha
        };
        return JSON.stringify(obj);
    }
};