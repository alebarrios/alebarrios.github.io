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
        const crearGrupoItem = this.#myHTMLhelper.getItemHTML("crear-grupo-item");
        crearGrupoItem.addEventListener("click", () => {
               
            const main = this.#myHTMLhelper.displayNuevoGrupoPage();
            const formElem = this.#myHTMLhelper.getItemHTML("form-crear-grupo");
            formElem.addEventListener("submit", (e) => {

                e.preventDefault();
                const formElements = e.target.elements;
                if (formElements.nombre.value) {
                    const nuevoGrupo = new Grupo(this.#myGroups.length + 1,formElements.nombre.value);
                    nuevoGrupo.agregarIntegrante(new IntegranteGrupo(this.#persona));
                    // agrego dos integrantes Extra
                    nuevoGrupo.agregarIntegrante(new IntegranteGrupo(new Persona("Juan")));
                    nuevoGrupo.agregarIntegrante(new IntegranteGrupo(new Persona("Damian")));

                    // Registro un gasto "random" a cada Integrante
                    nuevoGrupo.registrarNuevoGasto(new Gasto(Math.random() * 100, TipoGasto.VARIOS), nuevoGrupo.getIntegrantes()[0]);
                    nuevoGrupo.registrarNuevoGasto(new Gasto(Math.random() * 100, TipoGasto.VARIOS), nuevoGrupo.getIntegrantes()[1]);
                    nuevoGrupo.registrarNuevoGasto(new Gasto(Math.random() * 100, TipoGasto.VARIOS), nuevoGrupo.getIntegrantes()[2]);

                    this.#myGroups.push(nuevoGrupo);
                    main.innerHTML = `<div class="alert alert-success" role="alert">
                    El grupo ${formElements.nombre.value} ha sido creado!
                    </div>`;

                    
                    this.#storageHelper.guardar(this.#myGroups.map( (item) => JSON.parse(item.getJSON())));
                }
                   
            });
        });
        
    }

    setMisGruposPageEventListener(){
        const misGruposItem = this.#myHTMLhelper.getItemHTML("mis-grupos-item");
        misGruposItem.addEventListener("click", () => {
            console.log(" click setMisGruposPageEventListener");
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
                    console.log(`click en boton ${group.getId()}`);
                    this.#myHTMLhelper.displayGrupoPage();
                    });
            });
            
            //addEventListener


        });  
    }

    setDashboardEventListener(){
        const dashboardItem = this.#myHTMLhelper.getItemHTML("dashboard-item");
        dashboardItem.addEventListener("click", () => {
            console.log(" click setDashboardEventListener");
            this.#myHTMLhelper.displayDashboardPage();
        });  
    }

    setBorrarLocalStorageListener(){
        const localStorageItem = this.#myHTMLhelper.getItemHTML("borrar-localStorage");
        localStorageItem.addEventListener("click", () => {
            console.log(" click setBorrarLocalStorageListener");
            this.#storageHelper.clear();
            window.location.href = "index.html";
        });  
    }



    loadStorage(){
        const gruposObjArr = this.#storageHelper.obtener();
        console.log(gruposObjArr);
        gruposObjArr?.forEach((gruposObj) => {
            this.#myGroups.push(Grupo.from(gruposObj));
        });
        //console.log(this.#myGroups);
    }
}