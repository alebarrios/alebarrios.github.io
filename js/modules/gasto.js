
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
    #descripcion;
    #fecha;
    #tipoGasto;
    #idIntegrante;

    /**
     * Crea un objeto tipo Gasto.
     * @param {{id: number, importe: string, descripcion: string, fecha: string, tipoGasto}} 
     * objeto de inicializacion de Gasto
     */
    constructor({id,importe,descripcion,fecha,tipoGasto,idIntegrante}){
        this.#id = id;
        this.#importe = parseFloat(importe);
        this.#descripcion = descripcion;
        this.#fecha = new Date(fecha);
        this.#tipoGasto = tipoGasto;
        this.#idIntegrante = idIntegrante;
    }

    static from({id,importe,descripcion,fecha,tipoGasto,idIntegrante}){
        return new Gasto({id,importe,descripcion,fecha,tipoGasto,idIntegrante});
    }

    static makeEnum(tipo){
        switch (tipo) {
            case "comida":
                return TipoGasto.COMIDA;
            case "combustible":
                return TipoGasto.COMBUSTIBLE;
            case "alojamiento":
                return TipoGasto.ALOJAMIENTO;
            default:
                return TipoGasto.VARIOS;   
        }
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
     * Obtiene la descripcion del gasto.
     * @return {string} la descripcion del gasto.
     */
    getDescripcion(){
        return this.#descripcion;
    }

    /**
     * Obtiene el Id del integrante que realizó el gasto.
     * @return {string} el Id del integrante.
     */
    getIdIntegrante(){
        return this.#idIntegrante;
    }

    /**
     * Obtiene el Id del Gasto.
     * @return {string} el Id del Gasto.
     */
    getId(){
        return this.#id;
    }


    /**
    * Retorna un string en formato JSON con los datos del Gasto.
    * @return {string} el Gasto en formato JSON.
    */
    getJSON(){
        const obj = {
            idGasto: this.#id,
            importeGasto: this.#importe,
            descripcionGasto: this.#descripcion,
            fechaGasto: this.#fecha,
            tipoGasto: this.#tipoGasto,
            idIntegrante: this.#idIntegrante
        };
        return JSON.stringify(obj);
    }
};