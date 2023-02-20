console.log("main.js");
import Gasto, {TipoGasto} from "./modules/gasto.js";
import Persona from "./modules/persona.js";
import IntegranteGrupo from "./modules/integrante-grupo.js";
import Grupo from "./modules/grupo.js";


const persona1 = new Persona("Juan");
const persona2 = new Persona("Pedro");
const persona3 = new Persona("Martin");

const miGrupo = new Grupo("Viaje");

const integrante1 = new IntegranteGrupo(persona1, miGrupo);
const integrante2 = new IntegranteGrupo(persona2, miGrupo);
const integrante3 = new IntegranteGrupo(persona3, miGrupo);

/* integrante1.agregarGasto(new Gasto(50, TipoGasto.ALOJAMIENTO));
integrante1.agregarGasto(new Gasto(50, TipoGasto.COMIDA)); */

/* miGrupo.agregarIntegrante(integrante1);
miGrupo.agregarIntegrante(integrante2); */

/* const gasto1 = integrante1.crearGasto(343, TipoGasto.ALOJAMIENTO);
const gasto2 = integrante1.crearGasto(100, TipoGasto.COMIDA); */

miGrupo.registrarNuevoGasto(new Gasto(200, TipoGasto.COMBUSTIBLE),integrante1);
miGrupo.registrarNuevoGasto(new Gasto(100, TipoGasto.COMIDA),integrante2);

miGrupo.printSaldos();



