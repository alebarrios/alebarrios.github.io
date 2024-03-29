/** Clase helper para encapsular la interacción con el DOM. */
export default class HTMLhelper{
    #document;

    /**
     * Crea un objeto tipo HTMLhelper.
     * @param {Document} _documento - la referencia al DOM.
     */
    constructor(documento){
        this.#document = documento;
        //document.getElementById("wrapper").remove();
        this.#inicializarHTML();
        this.#cargarSBAdminScript();
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
            _clases: "flex-columm",
            _padre: wrapperElement});
        //Content Div
        const contentElement = this.#AgregarElementoHTML({
            _id: "content",
            _padre: contentWrapperElement}); 
        //Nav
        this.#crearNav(contentElement);
        
        //Container Fluid - Page content
        const containerFluidElement = this.#AgregarElementoHTML({
            _id: "main-content",
            _clases: "container-fluid",
            _padre: contentElement}); 

        //this.displayDashboardPage();
            
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
        titulo.innerHTML = `<div class="sidebar-brand-icon"><i class="fas fa-donate"></i>
            </div><div class="sidebar-brand-text mx-3">Divisor-Gastos</div>`;
        //Divider
        this.#AgregarElementoHTML({_tipo: "hr",_clases: "sidebar-divider my-0",_padre: sideBarElement});
        
        this.#AgregarElementoHTML({
            _tipo: "li",
            _id: "dashboard-item",
            _clases: "nav-item",
            _padre: sideBarElement}).innerHTML = `<a class="nav-link" href="#">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>`;

        //Divider
        this.#AgregarElementoHTML({_tipo: "hr",_clases: "sidebar-divider",_padre: sideBarElement});        
            
        this.#AgregarElementoHTML({_clases: "sidebar-heading",_padre: sideBarElement}).innerHTML = `Menu`;

        this.#crearSeccionSidebar("Grupos",["Crear Grupo", "Mis Grupos"],"users", sideBarElement);
        this.#crearSeccionSidebar("Gastos",["Crear Gasto", "Mis Gastos"],"dollar-sign", sideBarElement);

        //Divider
        this.#AgregarElementoHTML({_tipo: "hr",_clases: "sidebar-divider d-none d-md-block",_padre: sideBarElement});
        //SidebarToggleButton
        this.#AgregarElementoHTML({_clases: "text-center d-none d-md-inline",_padre: sideBarElement}).innerHTML 
            = `<button class="rounded-circle border-0" id="sidebarToggle"></button>`;

        return sideBarElement;
    }

    #crearNav(nodoPadre){
        const navElement = this.#AgregarElementoHTML({
            _tipo: "nav",
            _clases: "navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow",
            _padre: nodoPadre});
        
            const navButton = this.#AgregarElementoHTML({
                _tipo: "button",
                _id: "sidebarToggleTop",
                _clases: "btn btn-link d-md-none rounded-circle mr-3",
                _padre: navElement});
            navButton.innerHTML = `<i class="fa fa-bars"></i>`;
            
        const navBar = this.#AgregarElementoHTML({
            _tipo: "ul",
            _clases: "navbar-nav ml-auto",
            _padre: navElement});

        //Alertas
        const navBarAlerts = this.#AgregarElementoHTML({
            _tipo: "li",
            _clases: "nav-item dropdown no-arrow mx-1",
            _padre: navBar});

        const aAlertas = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link dropdown-toggle",
            _id: "alertsDropdown",
            _href: "#",
            _padre: navBarAlerts});
        aAlertas.innerHTML = `<i class="fas fa-bell fa-fw"></i>
        <span class="badge badge-danger badge-counter">1</span>`;
        aAlertas.setAttribute('role','button');
        aAlertas.setAttribute('data-toggle','dropdown');
        aAlertas.setAttribute('aria-haspopup','true');
        aAlertas.setAttribute('aria-expanded','false');
        
        const dropdownAlertas = this.#AgregarElementoHTML({
            _clases: "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in",
            _padre: navBarAlerts});
        dropdownAlertas.setAttribute('aria-labelledby','alertsDropdown');
        dropdownAlertas.innerHTML = `<h6 class="dropdown-header">
                    Alertas
                </h6>
                <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="mr-3">
                        <div class="icon-circle bg-success">
                            <i class="fas fa-donate text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">Marzo, 2023</div>
                        Bienvenid@ al divisor de Gastos!
                    </div>
                </a>
                <a class="dropdown-item text-center small text-gray-500" href="#">Cerrar</a>`;
        //Mensajes
        const navBarMensajes = this.#AgregarElementoHTML({
            _tipo: "li",
            _clases: "nav-item dropdown no-arrow mx-1",
            _padre: navBar});

        const aMensajes = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link dropdown-toggle",
            _id: "messagesDropdown",
            _href: "#",
            _padre: navBarMensajes});
        aMensajes.innerHTML = `<i class="fas fa-envelope fa-fw"></i>
        <span class="badge badge-danger"></span>`;
        aMensajes.setAttribute('role','button');
        aMensajes.setAttribute('data-toggle','dropdown');
        aMensajes.setAttribute('aria-haspopup','true');
        aMensajes.setAttribute('aria-expanded','false');

        const dropdownMensajes = this.#AgregarElementoHTML({
            _clases: "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in",
            _padre: navBarMensajes});
        dropdownMensajes.setAttribute('aria-labelledby','messagesDropdown');
        dropdownMensajes.innerHTML = `<h6 class="dropdown-header">Mensajes</h6>
            <a class="dropdown-item text-center small text-gray-500" href="#">No hay mensajes</a>`;

        this.#AgregarElementoHTML({
            _clases: "topbar-divider d-none d-sm-block",
            _padre: navBar});

        //Info User
        const navBarUser = this.#AgregarElementoHTML({
            _tipo: "li",
            _clases: "nav-item dropdown no-arrow",
            _padre: navBar});

        const aUser = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link dropdown-toggle",
            _id: "userDropdown",
            _href: "#",
            _padre: navBarUser});
        aUser.innerHTML = ` <span class="mr-2 d-none d-lg-inline text-gray-600 small">Usuario Coder</span>
        <img class="img-profile rounded-circle" src="img/undraw_profile.svg">`;
        aUser.setAttribute('role','button');
        aUser.setAttribute('data-toggle','dropdown');
        aUser.setAttribute('aria-haspopup','true');
        aUser.setAttribute('aria-expanded','false');
        
        const dropdownUser = this.#AgregarElementoHTML({
            _clases: "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in",
            _padre: navBarUser});
        dropdownUser.setAttribute('aria-labelledby','userDropdown');
        dropdownUser.innerHTML = `<a id="borrar-localStorage" class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Borrar localStorage</a>`;

        return navElement;
    }


    #crearSeccionSidebar(titulo,items,nombreIcono,padre){
        const sidebar = this.#AgregarElementoHTML({_tipo: "li",_clases: "nav-item",_padre: padre});
        
        const aSidebar = this.#AgregarElementoHTML({
            _tipo: "a",
            _clases: "nav-link collapsed",
            _href: "#",
            _padre: sidebar});
        aSidebar.innerHTML = `<i class="fas fa-fw fa-${nombreIcono}"></i><span>${titulo}</span>`;
        titulo.replace(/ /g,'')
        aSidebar.setAttribute('data-toggle','collapse');
        aSidebar.setAttribute('data-target',`#collapse${titulo}`);
        aSidebar.setAttribute('aria-expanded','true');
        aSidebar.setAttribute('aria-controls',`#collapse${titulo}`);

        const collapseSidebar = this.#AgregarElementoHTML({
            _clases: "collapse",
            _id: `collapse${titulo}`,
            _href: "#",
            _padre: sidebar});
        collapseSidebar.setAttribute('aria-labelledby',`heading${titulo}`);
        collapseSidebar.setAttribute('data-parent','#accordionSidebar');

        const collapseGruposInnerElement = this.#AgregarElementoHTML({
            _clases: "bg-white py-2 collapse-inner rounded",
            _padre: collapseSidebar});


        items.forEach(item => {
            const itemOriginal = item;
            const crearGrupoElement = this.#AgregarElementoHTML({
                _id: `${item.replace(/ /g,'')}-item`,
                _clases: "collapse-item",
                _padre: collapseGruposInnerElement});
            crearGrupoElement.innerHTML = itemOriginal;
        });

    }

    #AgregarElementoHTML({_tipo,_id,_type,_name,_clases,_href,_padre}) {
        const element = this.#document.createElement(_tipo || "div");
        _id && (element.id = _id);
        _type && (element.type = _type);
        _name && (element.name = _name);
        _clases && (element.classList = _clases);
        _href && (element.href = _href);
        (_padre || this.#document.body)?.append(element);
        return element;
    }

    #cargarSBAdminScript(){
        //Tengo que cargar dinámicamente el js del Template ya que si no algunas cosas estéticas no funcionan.
        const fun = async function loadModule() {
            await import("../../js/vendor/sb-admin-2.min.js");
        }
        fun();
    }

    getItemHTML(id){
        return this.#document.getElementById(id);
    }

    queryHTML(id){
        return this.#document.querySelector(id);
    }

    displayNuevoGrupoPage(){
        this.#document.getElementById("collapseGrupos").classList = "collapse";
        const main = this.#document.getElementById("main-content");
           main.innerHTML = 
                `<h1 class="h3 mb-2 text-gray-800">Nuevo Grupo</h1>
                <div class="row">
                    <div class="col-xl-6 col-md-6 mb-4">
                        <form class="form" id="form-crear-grupo">
                            <div class="form-floating">
                                <input type="text" class="form-control mb-1 mr-sm-2" id="nombre" placeholder="Nombre" required>
                                <label for="nombre">Nombre Grupo</label>
                                <div class="invalid-feedback">por favor completa este campo</div>
                                <div class="valid-feedback">
                                Looks good!
                                </div>
                            </div>
                            <div class="radio">
                            
                                <input type="radio" class="btn-check" name="options" id="option1" value="viaje" autocomplete="off" checked />
                                <label class="btn btn-outline-primary" for="option1">
                                <i class="fas fa-fw fa-plane"></i>Viaje</label>
                                
                                <input type="radio" class="btn-check" name="options" id="option2" value="amigos" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option2">
                                <i class="fas fa-fw fa-users"></i>Amigos</label>

                                <input type="radio" class="btn-check" name="options" id="option3" value="pareja" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option3">
                                <i class="fas fa-fw fa-heart"></i>Pareja</label>

                                <input type="radio" class="btn-check" name="options" id="option4" value="otros" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option4">Otros</label>
                            </div>
                            <div class="input-group mb-3">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon1"><i class="fas fa-fw fa-plus"></i>Integrante</button>
                                
                                    <input type="text" class="form-control" placeholder="Nombre" id="text-button-addon1">
                                    
                                
                            </div>
                            <label for="listaNuevoIntegrante">Integrantes: </label>
                            <ul class="list-group" id="listaNuevoIntegrante">
                            <li class="list-group-item disabled">Usuario Coder (Yo)</li>
                            </ul>
                            
                            <button type="submit" class="btn btn-primary my-2 col-sm-12 col-xs-12 col-md-6 col-lg-6">Crear Grupo</button>
                        </form>
                    </div>
                </div>`;
                
                        
         return main;
    }

    displayMisGruposPage(_arrayGrupos){
        this.#document.getElementById("collapseGrupos").classList = "collapse";
        const main = this.#document.getElementById("main-content");
        
        const cards = _arrayGrupos.map(grupo => {   
            return `
            <div class="card border-primary shadow my-1">
                <div class="card-header">
                    <h5 class="card-title"><i class="fas fa-info-circle pr-1"></i>${grupo.nombre}</h5>
                    <p class="card-text"><small class="text-muted">Creado el ${grupo.fecha}</small></p>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${grupo.cantIntegrantes} Integrantes</li>
                        <li class="list-group-item">Total gastado: $${grupo.gastoTotal} </li>
                    </ul>    
                </div>
                <div class="card-footer">
                    <a href="#" class="btn btn-info" data-id='ver-grupo-${grupo.id}'>Ver detalle</a>
                    <a href="#" class="btn btn-danger" data-id='borrar-grupo-${grupo.id}'>Borrar</a>
                </div>
            </div>
            `
        }).join(" ") || `<div class="alert alert-secondary" role="alert">Aun no hay grupos creados :(</div>`;
        
        main.innerHTML = `
            <h1 class="h3 mb-0 text-gray-800">Mis Grupos</h1>
            <div class="row">
                <div class="col-sm-4" id="grupo-cards">` + 
                    cards + `
                </div>
            </div>
           

           
           <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Advertencia</h1>
                        <button type="button" class="btn-close" data-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        Está seguro que quiere borrar el grupo?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" id="confirma-borrar-grupo" class="btn btn-danger">Borrar</button>
                    </div>
                </div>
            </div>
        </div>`;

        return main;
    }

    removerGrupoHTML(dataId){
        const main = this.#document.getElementById("grupo-cards");
        const id = `data-id="borrar-grupo-${dataId}"`;
        const element = this.#document.querySelector(`.btn[${id}]`).parentNode.parentNode;
        main.removeChild(element);
    }
    
    displayGrupoPage({info,integrantes,gastosArr,arraySaldos}){
        const main = this.#document.getElementById("main-content");

        const seccionInfo = `
        <div class="card shadow m-2">
            <div class="card-body">
                <p>Id: <strong>#${info.id}</strong></p>
                <p class="text-capitalize">Nombre: <strong>${info.nombre}</strong></p>
                <p class="text-capitalize">Tipo: <strong>${info.tipoGrupo}</strong></p>
                <p># de integrantes: <strong>${info.cantIntegrantes}</strong></p>
            </div>
        </div>
        `;

        const seccionIntegrantes = `
        <div class="card shadow m-2">
            <div class="card-body">
                <ul class="list-group list-group-flush">` +
                integrantes.map(element => {
                    return `<li class="list-group-item"><i class="fas fa-user text-primary mr-2"></i>${element}</li>`; 
                }).join("")
            + `</ul>
            </div>
        </div>`;
                console.log("displayGrupoPage");
        const stringGastos = gastosArr.map(element => {
            return `
            <a class="list-group-item list-group-item-action" data-id-integrante="${element.idIntegrante}" data-id="${element.idGasto}">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1"><strong>$${element.importe.toFixed(2)}</strong></h5>
                    <p class="mb-1"><i class="fas fa-fw fa-${element.icono}"></i></p>
                </div>   
                <p class="my-2">${element.descripcion}</p>
                <div class="d-flex w-100 justify-content-between">
                    <small class="text-muted">${element.fecha}</small>
                    <small class="text-muted">${element.nombreIntegrante}</small>
                </div>
            </a>
            `; 
        }).join("") || `<li class="list-group-item">Este grupo aún no tiene gastos.</li>`;

        const seccionGastos = `
        <div class="card shadow m-2">
            <div class="card-body">
                <ul class="list-group"> 
                ` +
                stringGastos +
               `</ul>
            </div>
        </div>`;

        const seccionSaldos = 
        `<div class="card shadow m-2">
            <div class="card-body">` +
                (arraySaldos.map(saldo => 
                `<p><span class="font-weight-bold text-danger">${saldo.deudor}</span> le debe a 
                <span class="font-weight-bold text-primary">${saldo.acreedor}</span> la suma de <strong>$${saldo.importe}</strong></p>`).join("") || 
                `<p>No hay saldos para mostrar.</p>`) + `
            </div>
        </div>`;

        const grupoPage = `
        <h1 class="h3 mb-2 text-gray-800 text-capitalize">Grupo ${info.nombre}</h1>
        <div class="row">
            <div class="col-xl-6 col-xxl-2 col-md-6 mb-2">
                <div class="card shadow mb-2">    
                    <ul class="nav nav-tabs px-1 pt-1">
                        <li class="active"><a class="nav-link font-weight-bold text-primary active" data-toggle="tab" href="#home">General</a></li>
                        <li><a class="nav-link font-weight-bold text-primary" data-toggle="tab" href="#menu1">Integrantes</a></li>
                        <li><a class="nav-link font-weight-bold text-primary" data-toggle="tab" href="#menu2">Gastos</a></li>
                        <li><a class="nav-link font-weight-bold text-primary" data-toggle="tab" href="#menu3">Saldos</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="home" class="tab-pane fade in active show">` +
                        seccionInfo + `
                        </div>
                        <div id="menu1" class="tab-pane fade">` +
                        seccionIntegrantes + `
                        </div>
                        <div id="menu2" class="tab-pane fade">` +
                        seccionGastos + `
                        </div>
                        <div id="menu3" class="tab-pane fade">` +
                        seccionSaldos + `
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex w-100 justify-content-between">
                <a href="#" id="boton-atras-grupo" class="btn btn-info"><i class="fas fa-fw fa-arrow-left"></i>Atrás</a>
            </div>
        </div>`;
        
        main.innerHTML = grupoPage;

     return main;
    }

    displayDashboardPage(info){  
        this.#document.getElementById("collapseGrupos").classList = "collapse";
        this.#document.getElementById("collapseGastos").classList = "collapse";
        const main = this.#document.getElementById("main-content");
           main.innerHTML = `
           <h1 class="h3 mb-2 text-gray-800">Dashboard</h1>
            <div class="row" id="contenido">
               
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-success shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Total Gastado (Usuario)</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">$${info.totalGastado}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-info shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                            Grupos (Usuario)</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">${info.cantGrupos}</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-comments fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Saldo Total (Usuario)</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">$${info.saldoTotal}</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-comments-dollar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            `;
         return main;
    }

    displayNuevoGastoPage(grupos){
        this.#document.getElementById("collapseGastos").classList = "collapse";
        const main = this.#document.getElementById("main-content");
        main.innerHTML = 
                `<h1 class="h3 mb-2 text-gray-800">Nuevo Gasto</h1>
                <div class="row">
                    <div class="col-xl-6 col-xxl-2 col-md-6 mb-4">
                        <form class="form" id="form-crear-gasto">
                            <div class="input-group mb-3">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" name="importe" step=".01" required>
                            </div>
                            <div class="form-floating">
                                <input type="text" class="form-control mb-2 mr-sm-2" id="descripcion" name="descripcion" required>
                                <label for="descripcion">Descripción del gasto</label>
                            </div>
                            <label for="radio-gasto">Tipo de Gasto: </label>
                            <div class="radio" id="radio-gasto">
                            
                                <input type="radio" class="btn-check" name="tipoGasto" id="option1" value="comida" autocomplete="off" checked />
                                <label class="btn btn-outline-primary" for="option1">
                                <i class="fas fa-fw fa-utensils"></i>Comida</label>
                            
                                <input type="radio" class="btn-check" name="tipoGasto" id="option2" value="combustible" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option2">
                                <i class="fas fa-fw fa-gas-pump"></i>Combustible</label>

                                <input type="radio" class="btn-check" name="tipoGasto" id="option3" value="alojamiento" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option3">
                                <i class="fas fa-fw fa-bed"></i>Alojamiento</label>

                                <input type="radio" class="btn-check" name="tipoGasto" id="option4" value="varios" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="option4">Varios</label>
                            </div>
                            <div class="form-floating">
                                <input type="date" id="fecha-gasto" class="form-control" name="fechaGasto" required>
                                <label for="fecha-gasto">Fecha de gasto</label>
                            </div>
                            <div class="form-floating">
                                <select class="form-select my-2" id="form-select-grupo" name="selectGrupo">
                                ` +
                                grupos.map(elem => `<option value="${elem.id}">${elem.nombre}</option>`).join("") + `
                                </select>
                                <label for="form-select-grupo">Elija el grupo</label>
                            </div>
                            <div id="select-integrante">
                            </div>
                            <button type="submit" class="btn btn-primary my-2 col-sm-12 col-xs-12 col-md-6 col-lg-6">Registrar Gasto</button>
                        </form>
                    </div>
                </div>`;
                         
         return main;
    }

    displayMensajeExitoso(mensaje){
        const main = this.#document.getElementById("main-content");
        main.innerHTML = `<div class="alert alert-success" role="alert">
        ${mensaje}
        </div>`
    }

    displayMensajeConError(mensaje){
        const main = this.#document.getElementById("main-content");
        main.innerHTML = `<div class="alert alert-info" role="info">
        ${mensaje}
        </div>`
    }

    displayMensajeSecundario(mensaje){
        const main = this.#document.getElementById("main-content");
        main.innerHTML = `<div class="alert alert-secondary" role="alert">
        ${mensaje}
        </div>`
    }

    agregarIntegrante(id,nombre){
        const lista = this.#document.getElementById(id);

        const item = this.#AgregarElementoHTML({
            _tipo: "li",
            _clases: "list-group-item",
            _padre: lista});
        //item.innerHTML = `${nombre} <i class="fas fa-fw fa-trash"></i>`;

        const borrar = this.#AgregarElementoHTML({
            _tipo: "i",
            _clases: "fas fa-fw fa-trash",
            _padre: item});
        item.insertBefore(this.#document.createTextNode(nombre), borrar);

        const itemHidden = this.#AgregarElementoHTML({
            _tipo: "input",
            _type: "hidden",
            _name: "integrantesLista",
            _id: id,
            _padre: lista});
        itemHidden.value = nombre;

        return item;
    }

    borrarIntegrante(id,item){
        const lista = this.#document.getElementById(id);
        lista.removeChild(item);
    }

    crearSelectIntegrante(opciones){
        const select = this.#document.getElementById("select-integrante");
        select.innerHTML =
        `<div class="form-floating">
            <select class="form-select my-2" id="form-select-integrante" name="selectIntegrante">
            ` +
            opciones.map(opcion => `<option value="${opcion.id}">${opcion.nombre}</option>`).join("") + `
            </select>
            <label for="form-select-grupo">Elija a nombre de quién</label>
        </div>
        `
        return select;
    }

    editarBadgeAlerta(cantidadMensajes){
        const badge = this.#document.querySelector("#alertsDropdown span");
        if(!badge) return;
        const campana = this.#document.getElementById("alertsDropdown");
        cantidadMensajes <= 0 ? campana.removeChild(badge) : badge.innerHTML = cantidadMensajes;
    }

}