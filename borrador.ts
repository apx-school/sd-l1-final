import * as jsonfile from "jsonfile"
import * as lodash from "lodash"
const pelis = jsonfile.readFileSync("./pelis.json")
const listaFiltrada = lodash.filter(pelis,function(o){o.title.includes("a")});
console.log(listaFiltrada)>