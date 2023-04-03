/** Clase que representa el controlador de la app js */
import HTMLhelper from "./HTMLhelper.js";
import Grupo from "./grupo.js";
import IntegranteGrupo from "./integrante-grupo.js";
import Persona from "./persona.js";
import Gasto, {TipoGasto} from "./gasto.js";
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
                    //let tipoGrupo = Grupo.makeEnum(formElements.);
                    console.log(formElements);
                    const nuevoGrupo = 
                        new Grupo(idgrupo,formElements.nombre.value, Grupo.makeEnum(formElements.options.value));
                        
                    let idIntegrante = nuevoGrupo.getIntegrantes().length;
                    //Agrego al usuario principal al grupo
                    nuevoGrupo.agregarIntegrante(
                        new IntegranteGrupo(idIntegrante++,this.#persona));
                    
                    //Agrego otros integrantes
                    //Corregir Bug cuando viene vacio o con 1 solo integrante adicional

                    formElements.integrantesLista.forEach( (i) => {
                        console.log(i.value);
                        nuevoGrupo.agregarIntegrante(
                            new IntegranteGrupo(idIntegrante++,new Persona(i.value)));
                    });

                    // Registro un gasto "random" a cada Integrante
                    nuevoGrupo.registrarNuevoGasto(new Gasto(Math.random() * 100, TipoGasto.VARIOS), nuevoGrupo.getIntegrantes()[0]);
                    nuevoGrupo.registrarNuevoGasto(new Gasto(Math.random() * 100, TipoGasto.VARIOS), nuevoGrupo.getIntegrantes()[1]);
                    nuevoGrupo.registrarNuevoGasto(new Gasto(Math.random() * 100, TipoGasto.VARIOS), nuevoGrupo.getIntegrantes()[2]);

                    this.#myGroups.push(nuevoGrupo);
                    this.#myHTMLhelper.displayMensajeExitoso(`El grupo ${formElements.nombre.value} ha sido creado!`);
                    
                    this.#storageHelper.guardar(this.#myGroups.map( (item) => JSON.parse(item.getJSON())));
                }
                   
            });

            const addIntegranteButton = this.#myHTMLhelper.getItemHTML("button-addon1");
            addIntegranteButton.addEventListener("click", (e) => {
                
                const integrante = this.#myHTMLhelper.getItemHTML("text-button-addon1");
                const itemLista = this.#myHTMLhelper.agregarIntegrante("listaNuevoIntegrante",integrante.value);
                integrante.value = "";
                //Evento borrar Integrantee
                itemLista.childNodes[1].addEventListener("click", (e) => {
                    console.log(e.target);
                    this.#myHTMLhelper.borrarIntegrante("listaNuevoIntegrante", e.target.parentNode);
                });

            });

        });
        
    }

    setMisGruposPageEventListener(){
        const misGruposItem = this.#myHTMLhelper.getItemHTML("MisGrupos-item");
        misGruposItem.addEventListener("click", () => {
            const grupoArrObj = this.#myGroups.map( (group) => {
                return {id: group.getId(), 
                        nombre: group.getNombre(), 
                        cantIntegrantes: group.getIntegrantes().length }
            });
            this.#myHTMLhelper.displayMisGruposPage(grupoArrObj);
            //agregar EventListners a cada grupo individual
            this.#myGroups.forEach((group) => {   
                const boton = this.#myHTMLhelper.queryHTML(`.btn-sm[data-id='grupo-${group.getId()}']`);
                boton.addEventListener("click", () => {
                    const info = {
                        id: group.getId(), 
                        nombre: group.getNombre(), 
                        cantIntegrantes: group.getIntegrantes().length,
                        tipoGrupo: group.getTipoGrupo() };
                    
                    const integrantes = group.getIntegrantes().map((int) => int.getPersona().getNombre());
                    const gastos = group.getGastos();
                    const mensajeSaldos = group.calcularDeudasPendientes();
                    //const mensajeSaldos = "Pendiente...";
                    this.#myHTMLhelper.displayGrupoPage({info,integrantes, gastos, mensajeSaldos});
                    });
            });

        });  
    }

    setDashboardEventListener(){
        const dashboardItem = this.#myHTMLhelper.getItemHTML("dashboard-item");
        dashboardItem.addEventListener("click", () => {
            this.#myHTMLhelper.displayDashboardPage();
        });  
    }

    setBorrarLocalStorageListener(){
        const localStorageItem = this.#myHTMLhelper.getItemHTML("borrar-localStorage");
        localStorageItem.addEventListener("click", () => {
            this.#storageHelper.clear();
            window.location.href = "index.html";
        });  
    }



    loadStorage(){
        const gruposObjArr = this.#storageHelper.obtener();
        gruposObjArr?.forEach((gruposObj) => {
            this.#myGroups.push(Grupo.from(gruposObj));
        });
    }
}