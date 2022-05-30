import { PelisCollection, Peli } from "./models";
import {isEmpty,isNumber} from "lodash"

class PelisController {
  pelisColl : PelisCollection
  constructor() {
    this.pelisColl = new PelisCollection()
  }
  
  async get(options) {
    if(options.hasOwnProperty("search")){
      const rtaSearch = await this.pelisColl.search(options.search)
      return rtaSearch
    }
    
    else if(isNumber(options.id)){
      //console.log("tengo la prop id entonces devuelvo ese elemento")
      const devuelvoUno= await this.pelisColl.getById(options.id)
      const msgInexistente = "La Pelicula buscada con ese id no existe"
      const rta = typeof devuelvoUno == typeof undefined ? msgInexistente : devuelvoUno
      
      return rta
    }

    else if(isEmpty(options) || typeof undefined){
      //console.log("No tengo argumentos entonces devuelvo todo");
      const devuelvoTodo = await this.pelisColl.getAll()
      return devuelvoTodo
    }
    

  }
  
  async add(peli:Peli){
    const rtaAdd = await this.pelisColl.add(peli)
    
    const mensajeTrue = "Pelicula agregada con exito"
    const mensajeFalse = "ERROR: pelicula existente"

    const rtaDeOperacion = rtaAdd === true ? mensajeTrue : mensajeFalse;
    
    return rtaDeOperacion
    //return rtaAdd
  }
}
export { PelisController };
//////////////////////////////////
// const p = new PelisController()
// async function main() {  
//   const opciones = {search:{title:"oUl",tag:"comEdia"}}
//   const r = await p.get(opciones)
//   console.log(r);
  
// }
// main()