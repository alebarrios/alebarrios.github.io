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
        headerElement.classList.add("intro");
        const containerElement = this.#document.createElement("div");
        containerElement.classList.add("container");
        headerElement.append(containerElement);
        containerElement.innerHTML = `<h1>Segunda Pre-Entrega del proyecto final</h1>`;
        

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
        const seccion2Element = this.#document.querySelector(".seccionSaldos");
        const seccion3Element = this.#document.querySelector(".seccionDeudas");
        
        const headerSeccion1Elem = this.#document.createElement("header");
        const listaGastosElem = this.#document.createElement("ul");
        headerSeccion1Elem.innerHTML = `<h2>Gastos del Grupo: ${nombreGrupo}</h2>`;

        const headerSeccion2Elem = this.#document.createElement("header");
        const listaSaldosElem = this.#document.createElement("ul");
        headerSeccion2Elem.innerHTML = `<h2>Saldos de Integrantes del Grupo: ${nombreGrupo}</h2>`;

        const headerSeccion3Elem = this.#document.createElement("header");
        const listaDeudasElem = this.#document.createElement("ul");
        headerSeccion3Elem.innerHTML = `<h2>Deudas de Integrantes del Grupo: ${nombreGrupo}</h2>`;

        seccion1Element.append(headerSeccion1Elem, listaGastosElem);
        seccion2Element.append(headerSeccion2Elem, listaSaldosElem);
        seccion3Element.append(headerSeccion3Elem, listaDeudasElem);
    }

     agregarGastoAlDOM({fecha, tipoGasto, importe, nombreIntegrante}){
        
        const element = this.#document.createElement("li");
        element.innerHTML = `${fecha} | ${tipoGasto} | $ ${importe.toFixed(2)} | ${nombreIntegrante}`;

        const listaElement = this.#document.querySelector(".seccionGastos ul");
        listaElement.append(element);     
    }

    agregarSaldoAlDOM(stringSaldo){
        const element = this.#document.createElement("li");
        element.innerHTML = stringSaldo;

        const listaElement = this.#document.querySelector(".seccionSaldos ul");
        listaElement.append(element);
    }

    agregarDeudaAlDOM(stringDeuda){
        const element = this.#document.createElement("li");
        element.innerHTML = stringDeuda;

        const listaElement = this.#document.querySelector(".seccionDeudas ul");
        listaElement.append(element);
    }


}