/** Clase helper para encapsular la interacción con el DOM. */
export default class HTMLhelper{
    #document;

    /**
     * Crea un objeto tipo HTMLhelper.
     * @param {Document} _documento - la referencia al DOM.
     */
        constructor(documento){
            this.#document = documento;
            this.crearContenedor({
                texto: "Hola Viteh",
                tipo: "div"
            });
        }

    crearContenedor({texto,tipo}){
        const elemento = document.createElement(tipo);
        elemento.innerHTML = texto;
    }


}