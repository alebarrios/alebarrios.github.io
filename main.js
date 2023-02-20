import Gasto, {TipoGasto} from "./modules/gasto.js";
import Persona from "./modules/persona.js";
import IntegranteGrupo from "./modules/integrante-grupo.js";
import Grupo from "./modules/grupo.js";

/** Funcion que simula la carga de gastos e integrantes a un grupo de personas. */
function simulador() {
    
    let nombreGrupo = prompt("Bienvenido/a al divisor de gastos. Por favor, ingrese el nombre de su grupo:");
    if(nombreGrupo === null) { return };
    if(nombreGrupo == "") {
        alert("Nombre de grupo vacío. Se asigna Grupo 1 como default.");
        nombreGrupo = "Grupo 1";
    }

    const miGrupo = new Grupo(nombreGrupo);

    let nombresIntegrantes = prompt(`Por favor, ingrese la lista de participantes del grupo ${nombreGrupo} separados por ','. Ejemplo: Pedro,Juan,Nahuel`);
    if(nombresIntegrantes === null) return;
    if(nombresIntegrantes == "") {
        alert("Nombres de integrantes vacíos. Se asignan Pedro,Juan y Nahuel como default.");
        nombresIntegrantes = "Pedro,Juan,Nahuel";
    };

    const arrayNombresIntegrantes = nombresIntegrantes.split(',');
    const arrayIntegrantes = [];
    
    for (let i = 0; i < arrayNombresIntegrantes.length; i++) {
        const nombreIntegrante = arrayNombresIntegrantes[i];
        const persona = new Persona(nombreIntegrante);
        const integrante = new IntegranteGrupo(persona, miGrupo);
        arrayIntegrantes.push(integrante);
    }

    for (let i = 0; i < arrayIntegrantes.length; i++) {
        const element = arrayIntegrantes[i];
        let stringGastos = prompt(`Por favor, ingrese la lista de gastos de ${element.getPersona().getNombre()} separados por ','. Ejemplo: 32.0,44.5,9.80 `);
        if(stringGastos === null) return;
        let arrayGastos = [];

        if(stringGastos == ""){
            alert("Lista de gastos vacía, se asigna 0 por default.");
        } else {
            arrayGastos = stringGastos.split(',');
        };

        arrayGastos = stringGastos.split(',');
        for (let j = 0; j < arrayGastos.length; j++) {
            const importe = isNaN(parseFloat(arrayGastos[j])) ? 0 : parseFloat(arrayGastos[j]);
            miGrupo.registrarNuevoGasto(new Gasto(importe, TipoGasto.VARIOS),element);
        }
        
    }

    miGrupo.mostrarSaldos();

}

simulador();



