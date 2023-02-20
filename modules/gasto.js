export const TipoGasto = {
    COMIDA : Symbol("comida"),
    COMBUSTIBLE : Symbol("combustible"),
    ALOJAMIENTO : Symbol("alojamiento"),
    VARIOS : Symbol("varios")
}

export default class Gasto {
    #importe;
    #fecha = {};
    #tipoGasto;

    constructor(_importe, _tipoGasto){
        this.#importe = parseFloat(_importe);
        this.#fecha = new Date();
        this.#tipoGasto = _tipoGasto;
    }

    getImporte(){
        return this.#importe;
    }

    getFecha(){
        return this.#fecha;
    }

    getTipoGasto(){
        return this.#tipoGasto;
    }
};