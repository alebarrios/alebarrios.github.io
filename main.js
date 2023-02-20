console.log("main.js");
import Gasto, {TipoGasto} from "./modules/gasto.js";
import Persona from "./modules/persona.js";
import IntegranteGrupo from "./modules/integrante-grupo.js";
import Grupo from "./modules/grupo.js";

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
    
    /* const persona1 = new Persona("Juan");
    const persona2 = new Persona("Pedro");
    const persona3 = new Persona("Martin"); */

/*     const integrante1 = new IntegranteGrupo(persona1, miGrupo);
    const integrante2 = new IntegranteGrupo(persona2, miGrupo);
    const integrante3 = new IntegranteGrupo(persona3, miGrupo); */

    /* integrante1.agregarGasto(new Gasto(50, TipoGasto.ALOJAMIENTO));
    integrante1.agregarGasto(new Gasto(50, TipoGasto.COMIDA)); */

    /* miGrupo.agregarIntegrante(integrante1);
    miGrupo.agregarIntegrante(integrante2); */

    /* const gasto1 = integrante1.crearGasto(343, TipoGasto.ALOJAMIENTO);
    const gasto2 = integrante1.crearGasto(100, TipoGasto.COMIDA); */

   /*  miGrupo.registrarNuevoGasto(new Gasto(200, TipoGasto.COMBUSTIBLE),integrante1);
    miGrupo.registrarNuevoGasto(new Gasto(100, TipoGasto.COMIDA),integrante2); */

    miGrupo.mostrarSaldos();

}

simulador();



