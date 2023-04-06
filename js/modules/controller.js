/** Clase que representa el controlador de la app js */
import HTMLhelper from "./HTMLhelper.js";
import Grupo from "./grupo.js";
import Persona from "./persona.js";
import Gasto from "./gasto.js";
import StorageHelper from "./storageHelper.js";

export default class Controller {
    #myHTMLhelper;
    #myGroups = [];
    #persona;
    #storageHelper;

    constructor(){
        this.#myHTMLhelper = new HTMLhelper(document);
        this.#storageHelper = new StorageHelper();
        this.#persona = new Persona("Usuario Coder");
        this.loadStorage();
        this.setCrearGrupoPageEventListener();
        this.setMisGruposPageEventListener();
        this.setCrearGastoPageEventListener();
        this.setDashboardEventListener();
        this.setBorrarLocalStorageListener();

    }

    setCrearGrupoPageEventListener(){
        const crearGrupoItem = this.#myHTMLhelper.getItemHTML("CrearGrupo-item");
        crearGrupoItem.addEventListener("click", () => {

        this.#myHTMLhelper.displayNuevoGrupoPage();
            const formElem = this.#myHTMLhelper.getItemHTML("form-crear-grupo");
            formElem.addEventListener("submit", (e) => {
                e.preventDefault();
                let idgrupo = this.#myGroups.length + 1;
                 
                const formElements = e.target.elements;
                if (formElements.nombre.value) {
                    
                    console.log(formElements);
                    const nombreGrupo = formElements.nombre.value;
                    const tipoGrupo = formElements.options.value;
                    const nuevoGrupo = new Grupo(idgrupo,nombreGrupo, Grupo.makeEnum(tipoGrupo));
                        
                    const arrIntegrantes = nuevoGrupo.getIntegrantes();
                    let idIntegrante = arrIntegrantes[arrIntegrantes.length - 1]?.getId() || 0;
                    //Agrego al usuario principal al grupo
                    nuevoGrupo.crearIntegrante(++idIntegrante,this.#persona);
                    
                    //Agrego otros integrantes
                    if(formElements?.integrantesLista){
                        const integrantes = formElements.integrantesLista;
                        if (integrantes instanceof RadioNodeList){
                            integrantes.forEach( (i) => {
                            console.log(i.value);
                            nuevoGrupo.crearIntegrante(++idIntegrante,new Persona(i.value));
                            });
                        } else{
                            nuevoGrupo.crearIntegrante(++idIntegrante,new Persona(integrantes.value));
                        };
                        
                    }

                    this.#myGroups.push(nuevoGrupo);
                    this.#myHTMLhelper.displayMensajeExitoso(`El grupo ${formElements.nombre.value} ha sido creado!`);
                    
                    this.#storageHelper.guardar(this.#myGroups.map( (item) => JSON.parse(item.getJSON())));
                } else {
                    formElements.nombre.classList.add("is-invalid");
                };
                   
            });

            const addIntegranteButton = this.#myHTMLhelper.getItemHTML("button-addon1");
            addIntegranteButton.addEventListener("click", (e) => {
                
                const integrante = this.#myHTMLhelper.getItemHTML("text-button-addon1");
                if(integrante.value){
                    integrante.classList = "form-control";
                    const itemLista = this.#myHTMLhelper.agregarIntegrante("listaNuevoIntegrante",integrante.value);
                    integrante.value = "";
                    //Evento borrar Integrantee
                    itemLista.childNodes[1].addEventListener("click", (e) => {
                        console.log(e.target);
                        this.#myHTMLhelper.borrarIntegrante("listaNuevoIntegrante", e.target.parentNode);
                    });
                } else {
                    integrante.classList = "form-control is-invalid";
                };
            });

        });
        
    }

    setMisGruposPageEventListener(){
        const misGruposItem = this.#myHTMLhelper.getItemHTML("MisGrupos-item");

        misGruposItem.addEventListener("click", () => {
            const grupoArrObj = this.#myGroups.map( (group) => {
                return {id: group.getId(), 
                        nombre: group.getNombre(),
                        fecha: group.getFecha().toLocaleDateString(), 
                        cantIntegrantes: group.getIntegrantes().length,
                        gastoTotal: group.getGastoTotal() 
                    }
            });
            this.#myHTMLhelper.displayMisGruposPage(grupoArrObj);
            const modalHTML = document.getElementById('exampleModal');
            const myModal = new bootstrap.Modal(modalHTML);

            this.#myGroups.forEach((group) => {   
                const boton = this.#myHTMLhelper.queryHTML(`.btn[data-id='ver-grupo-${group.getId()}']`);
                boton.addEventListener("click", () => {
                    const info = {
                        id: group.getId(), 
                        nombre: group.getNombre(), 
                        cantIntegrantes: group.getIntegrantes().length,
                        tipoGrupo: group.getTipoGrupo(),
                        gastoTotal: group.getGastoTotal()
                    };
                    
                    const integrantes = group.getIntegrantes().map((int) => int.getPersona().getNombre());
                    
                    const gastos = group.getGastos();

                    const gastosArr = gastos.map(gasto => {
                        const nombreIntegrante = group.getIntegrantes().find(int => int.getId() == gasto.getIdIntegrante())?.getPersona().getNombre();
                        const dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
                        const fecha = gasto.getFecha().toLocaleDateString('es-ES', dateOptions);
                        return {
                            importe: gasto.getImporte(),
                            descripcion: gasto.getDescripcion(),
                            fecha,
                            nombreIntegrante
                        }
                    });

                    const mensajeSaldos = group.calcularDeudasPendientes();
                    this.#myHTMLhelper.displayGrupoPage({info,integrantes, gastosArr, mensajeSaldos});


                    const triggerTabList = document.querySelectorAll('.nav-tabs a');
                    triggerTabList.forEach(triggerEl => {
                        const tabTrigger = new bootstrap.Tab(triggerEl)

                        triggerEl.addEventListener('click', event => {
                            event.preventDefault();
                            tabTrigger.show();
                        });
                    });
                });


                const botonBorrar = this.#myHTMLhelper.queryHTML(`.btn[data-id='borrar-grupo-${group.getId()}']`);
                console.log(`Se agrega eventlistener de botonBorrar en grupo ${group.getId()}`);
                botonBorrar.addEventListener("click", (e) => {
                    const confirmaBorrar = this.#myHTMLhelper.getItemHTML("confirma-borrar-grupo");
                    confirmaBorrar.dataset.grupo = group.getId();
                    myModal.show();
                });

            });

            const confirmaBorrar = this.#myHTMLhelper.getItemHTML("confirma-borrar-grupo");
            const funcionConfirmaBorrar = ev => {
                const idGrupo = parseInt(ev.target.getAttribute("data-grupo"));
                console.log(idGrupo);
                this.borrarGrupo(idGrupo);
                myModal.hide();
                this.#myHTMLhelper.removerGrupoHTML(ev.target.getAttribute("data-grupo"));
                this.#myGroups.length == 0 && this.#myHTMLhelper.displayMensajeSecundario("Aun no hay grupos creados :(");
            };
    
            console.log(`Se agrega eventlistener de confirmaBorrar`);
            confirmaBorrar.addEventListener("click", funcionConfirmaBorrar);

        });  
    }

    setCrearGastoPageEventListener(){
        const crearGrupoItem = this.#myHTMLhelper.getItemHTML("CrearGasto-item");
        crearGrupoItem.addEventListener("click", () => {
            console.log("setCrearGastoPageEventListener");

            if(this.#myGroups.length > 0){
                
                const arrGrupos = this.#myGroups.map(grupo => {
                    return { id: grupo.getId(), nombre: grupo.getNombre() }});
                this.#myHTMLhelper.displayNuevoGastoPage(arrGrupos);
                if (arrGrupos.length == 1){
                    this.#myHTMLhelper.crearSelectIntegrante(this.#myGroups[0].getIntegrantes().map(int => {
                        return { id: int.getId(), nombre: int.getPersona().getNombre() }})
                    );
                } 
            

                const selectElem = this.#myHTMLhelper.getItemHTML("form-select-grupo");
                selectElem.addEventListener("change", e => {
                    console.log("bla bla");
                    const integrantes = this.#myGroups.find(grupo => e.target.value == grupo.getId()).getIntegrantes();
                    this.#myHTMLhelper.crearSelectIntegrante(integrantes.map(int => {
                        return { id: int.getId(), nombre: int.getPersona().getNombre() }})
                    );
                });

                const formElem = this.#myHTMLhelper.getItemHTML("form-crear-gasto");
                formElem.addEventListener("submit", (e) => {
                    e.preventDefault();
                    console.log(e.target.elements);
                    const formElements = e.target.elements;
                    if (formElements.nombre.value) {
                        //validar
                        const idGrupo = formElements.selectGrupo.value;
                        const idIntegrante = parseInt(formElements.selectIntegrante.value);
                        const importeGasto = formElements.importe.value;
                        const descripcionGasto = formElements.descripcion.value;
                        const fechaGasto = formElements.fechaGasto.value;
                        const tipoGasto = formElements.tipoGasto.value;
                        const grupo = this.#myGroups.find(grupo => idGrupo == grupo.getId());
                        const gastos = grupo.getGastos();

                        //REVALIDAR
                        const idGasto = gastos[gastos.length - 1]?.getId() || 1;

                        const gasto = new Gasto({
                            idGasto: idGasto,
                            importeGasto,
                            descripcionGasto,
                            fechaGasto,
                            tipoGasto,
                            idIntegrante
                        });

                        grupo.registrarNuevoGasto(gasto);
             
                        this.#myHTMLhelper.displayMensajeExitoso(`El gasto ${formElements.nombre.value} ha sido agregado!`);
                        this.#storageHelper.guardar(this.#myGroups.map( (item) => JSON.parse(item.getJSON())));
                    } else {
                        formElements.nombre.classList.add("is-invalid");
                    };
                    
                });
            }
        });
    }

    setDashboardEventListener(){
        const dashboardItem = this.#myHTMLhelper.getItemHTML("dashboard-item");
        dashboardItem.addEventListener("click", () => {
            this.#myHTMLhelper.displayDashboardPage(this.getInfoUsuario());
        });  
    }

    setBorrarLocalStorageListener(){
        const localStorageItem = this.#myHTMLhelper.getItemHTML("borrar-localStorage");
        localStorageItem.addEventListener("click", () => {
            this.#storageHelper.clear();
            window.location.href = "index.html";
        });  
    }

    borrarGrupo(idGrupo){
        this.#myGroups.splice(this.#myGroups.findIndex(elem => elem.getId() == idGrupo),1);
    }

    getInfoUsuario(){
        const cantGrupos = this.#myGroups.reduce((acum, grupo) => {
            return grupo.getIntegrantes().find(integrante => integrante.getId() == 1) && ++acum;
        },0);

        const totalGastado = this.#myGroups.reduce((acum, grupo) => {
            return acum + grupo.getGastoDeIntegrante(1);
        },0);

        const saldoTotal = this.#myGroups.reduce((acum, grupo) => {
            return acum + grupo.getSaldo(1);
        },0).toFixed(2);

        const info = {
            totalGastado,
            cantGrupos,
            saldoTotal
        };
        return info;
    }

    loadStorage(){
     /*    const gruposObjArr = this.#storageHelper.obtener();
        gruposObjArr?.forEach((gruposObj) => {
            this.#myGroups.push(Grupo.from(gruposObj));
        }); */

        fetch("../../grupos.json")
        .then(resp => resp.json())
        .then(data => {
            
            data.userGroups.forEach((gruposObj) => {
                
                this.#myGroups.push(Grupo.from(gruposObj));
            });
            this.#myHTMLhelper.displayDashboardPage(this.getInfoUsuario());
        })
        .catch(err => console.log("Error leyendo json:" + err))

    }
}