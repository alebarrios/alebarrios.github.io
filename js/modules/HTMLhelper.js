/** Clase helper para encapsular la interacción con el DOM. */
export default class HTMLhelper{
    #document;

    /**
     * Crea un objeto tipo HTMLhelper.
     * @param {Document} _documento - la referencia al DOM.
     */
    constructor(documento){
        this.#document = documento;
        document.getElementById("wrapper").remove();
        this.#inicializarHTML();
    }

    #inicializarHTML() {
        //Body
        this.#document.body.id = "page-top";
        this.#document.body.className = "sidebar-toggled";
        //Wrapper Div
        const wrapperElement = this.#AgregarElementoHTML({
            _id: "wrapper",
            _padre: this.#document.body});
        //Sidebar
        this.#crearSideBar(wrapperElement);
        //Content Wrapper Div
        const contentWrapperElement = this.#AgregarElementoHTML({
            _id: "content-wrapper",
            _clases: "d-flex flex-columm",
            _padre: wrapperElement});
        //Content Div
        const contentElement = this.#AgregarElementoHTML({
            _id: "content",
            _padre: contentWrapperElement}); 
        //Nav
        this.#AgregarElementoHTML({
            _tipo: "nav",
            _clases: "navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow",
            _padre: contentElement}); 
        //Container Fluid - Page content
        const containerFluidElement = this.#AgregarElementoHTML({
            _clases: "container-fluid",
            _padre: contentElement}); 
            
    }

    #crearSideBar(nodoPadre){
        const sideBarElement = this.#AgregarElementoHTML({
            _tipo: "ul",
            _id: "accordionSidebar",
            _clases: "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion",
            _padre: nodoPadre});

        const titulo = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "sidebar-brand d-flex align-items-center justify-content-center",
            _href: "index.html",
            _padre: sideBarElement});
        titulo.innerHTML = `<div class="sidebar-brand-text mx-3">Divisor-Gastos</div>`;
        //Divider
        this.#AgregarElementoHTML({_tipo: "hr",_clases: "sidebar-divider my-0",_padre: sideBarElement});
        
        this.#AgregarElementoHTML({
            _tipo: "li",
            _clases: "nav-item",
            _padre: sideBarElement}).innerHTML = `<a class="nav-link" href="index.html">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>`;

        //Divider
        this.#AgregarElementoHTML({_tipo: "hr",_clases: "sidebar-divider",_padre: sideBarElement});        
            
        this.#AgregarElementoHTML({_clases: "sidebar-heading",_padre: sideBarElement}).innerHTML = `Menu`;
        
        //Seccion Grupos Sidebar
        const grupoSidebar = this.#AgregarElementoHTML({_tipo: "li",_clases: "nav-item",_padre: sideBarElement});
        
        const aGrupos = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link collapsed",
            _href: "#",
            _padre: grupoSidebar});
        aGrupos.innerHTML = `<i class="fas fa-fw fa-folder"></i><span>Grupos</span>`;
        aGrupos.setAttribute('data-toggle','collapse');
        aGrupos.setAttribute('data-target','#collapsePages');
        aGrupos.setAttribute('aria-expanded','true');
        aGrupos.setAttribute('aria-controls','collapsePages');

        const collapseGrupos = this.#AgregarElementoHTML({
            _clases: "collapse",
            _id: "collapsePages",
            _href: "#",
            _padre: grupoSidebar});
        collapseGrupos.innerHTML = `<div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="#">Crear Grupo</a>
            <a class="collapse-item" href="#">Mis Grupos</a>
            <div class="collapse-divider"></div></div>`;
        collapseGrupos.setAttribute('aria-labelledby','headingPages');
        collapseGrupos.setAttribute('data-parent','#accordionSidebar');

        //Seccion Gastos Sidebar
        const gastoSidebar = this.#AgregarElementoHTML({_tipo: "li",_clases: "nav-item",_padre: sideBarElement});
                
        const aGastos = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link collapsed",
            _href: "#",
            _padre: gastoSidebar});
        aGastos.innerHTML = `<i class="fas fa-fw fa-folder"></i><span>Gastos</span>`;
        aGastos.setAttribute('data-toggle','collapse');
        aGastos.setAttribute('data-target','#collapseGastos');
        aGastos.setAttribute('aria-expanded','true');
        aGastos.setAttribute('aria-controls','collapseGastos');

        const collapseGastos = this.#AgregarElementoHTML({
            _clases: "collapse",
            _id: "collapseGastos",
            _href: "#",
            _padre: gastoSidebar});
        collapseGastos.innerHTML = `<div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="#">Crear Gasto</a>
            <a class="collapse-item" href="#">Mis Gastos</a>
            <div class="collapse-divider"></div></div>`;
        collapseGastos.setAttribute('aria-labelledby','headingGastos');
        collapseGastos.setAttribute('data-parent','#accordionSidebar');

        //Divider
        this.#AgregarElementoHTML({_tipo: "hr",_clases: "sidebar-divider d-none d-md-block",_padre: sideBarElement});
        //SidebarToggleButton
        this.#AgregarElementoHTML({_clases: "text-center d-none d-md-inline",_padre: sideBarElement}).innerHTML 
            = `<button class="rounded-circle border-0" id="sidebarToggle"></button>`;

        return sideBarElement;
    }

    #AgregarElementoHTML({_tipo,_id,_clases,_href,_padre}) {
        const element = this.#document.createElement(_tipo || "div");
        _id && (element.id = _id);
        _clases && (element.classList = _clases);
        _href && (element.href = _href);
        (_padre || this.#document.body)?.append(element);
        return element;
    }

    #viejoinicializarHTML(){
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