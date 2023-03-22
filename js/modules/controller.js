/** Clase que representa el controlador de la app js */
import HTMLhelper from "./HTMLhelper.js";
import Grupo from "./grupo.js";
import StorageHelper from "./storageHelper.js";

export default class Controller {
    #myHTMLhelper;
    #myGroups;
    #storageHelper;

    constructor(){
        this.#myHTMLhelper = new HTMLhelper(document);
        this.#storageHelper = new StorageHelper();
        this.#myGroups = [];
        this.setCrearGrupoPageEventListener();
        this.setMisGruposPageEventListener();
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
                    this.#myGroups.push(new Grupo(formElements.nombre.value));
                    main.innerHTML = `<div class="alert alert-success" role="alert">
                    El grupo ${formElements.nombre.value} ha sido creado!
                    </div>`;
                }
                   
            });
        });
        
    }

    setMisGruposPageEventListener(){
        console.log("setMisGruposPageEventListener");
        const misGruposItem = this.#myHTMLhelper.getItemHTML("mis-grupos-item");
        misGruposItem.addEventListener("click", () => {
            console.log(" click setMisGruposPageEventListener");
            const arrayNombres = this.#myGroups.map( (item) => item.getNombre() );
            this.#myHTMLhelper.displayMisGruposPage(arrayNombres);
        });
        
        
    }
}