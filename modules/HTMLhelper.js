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
        mainElement.innerHTML = `Este es el main`;

        const footerElement = this.#document.createElement("footer");
        footerElement.innerHTML = `Este es el footer`; 

        this.#document.body.append(headerElement);
        this.#document.body.append(mainElement);
        this.#document.body.append(footerElement);
    }

    crearContenedor({texto,tipo}){
        const elemento = document.createElement(tipo);
        elemento.innerHTML = texto;
    }


}