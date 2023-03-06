/** Clase helper para encapsular la interacción con el DOM. */
export default class HTMLhelper{
    #document;

    /**
     * Crea un objeto tipo HTMLhelper.
     * @param {Document} _documento - la referencia al DOM.
     */
    constructor(documento){
        this.#document = documento;
        this.#inicializarHTML();
    }

    #inicializarHTML(){
        const headerElement = this.#document.createElement("header");
        headerElement.innerHTML = `<h1>Segunda Pre-Entrega del proyecto final</h1>`;

        const mainElement = this.#document.createElement("main");

        const footerElement = this.#document.createElement("footer");
        footerElement.innerHTML = `Alejandro Barrios - Coderhouse`;
        
        const seccion1Element = this.#document.createElement("section");
        seccion1Element.className = "seccionGastos";

        const seccion2Element = this.#document.createElement("section");
        seccion2Element.className = "seccionSaldos";

        const seccion3Element = this.#document.createElement("section");
        seccion3Element.className = "seccionDeudas";

        mainElement.append(seccion1Element, seccion2Element, seccion3Element);

        this.#document.body.append(headerElement, mainElement, footerElement);
        
    }

    agregarGrupoAlDOM(nombreGrupo){
        const seccion1Element = this.#document.querySelector(".seccionGastos");
        
        const headerElem = this.#document.createElement("header");
        const listaElem = this.#document.createElement("ul");
        headerElem.innerHTML = `<h2>Gastos del Grupo: ${nombreGrupo}</h2>`;

        seccion1Element.append(headerElem, listaElem);
    }

     agregarGastoAlDOM({fecha, tipoGasto, importe, nombreIntegrante}){
        
        const element = this.#document.createElement("li");
        element.innerHTML = `${fecha} | ${tipoGasto} | ${importe} | ${nombreIntegrante}`;

        const listaElement = this.#document.querySelector(".seccionGastos ul");
        listaElement.append(element);     
    }

    agregarSaldoAlDOM(){
        
    }


}