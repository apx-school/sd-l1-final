import { PelisCollection, Peli } from "./models";
import * as lodash from "lodash"

class PelisControllerOptions{
  _: "get"| "search" | "add";
}

class PelisController {
  pelisCollection: PelisCollection
  promesa: Promise<any>

  constructor() {
    this.pelisCollection = new PelisCollection()
    this.promesa = this.pelisCollection.getAll()
  }
  
  processOptions(options: PelisControllerOptions){
    let respuesta

    if (options.hasOwnProperty('_') && options._.length == 0) {
      respuesta = this.promesa
    } else if (options._[0] == "get") {
      respuesta = this.get({id: options._[1]})
    } else if (options._ == "search") {
      respuesta = this.get(options)
    } else if (options._ == "add") {
      const pelicula = lodash.omit(options, "_")
      respuesta = this.add(pelicula)
    }

    return respuesta
  }

  get(options){
    if (options.id) {
      return this.pelisCollection.getById(options.id)
    } if (options.title) {
      return this.pelisCollection.search(options)
    } if (options.tag) {
      return this.pelisCollection.search(options)
    }
  }

  add(peli:Peli) {
    return this.pelisCollection.add(peli)
  }
}

function main() {
  const controller =  new PelisController()
  controller.get({id:2}).then(res=>console.log(res.title))
}

main()

export { PelisController };
