/*

Instanciá el modelo PelisCollection y guardalo en una propiedad interna del controller.
Tomá la estructura base y completá la clase PelisController. Además, agregale a esta clase los siguientes métodos
 asincrónicos que tienen que usar los métodos del modelo para interactuar con la data:
    * get(options) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
        si el objeto tiene la propiedad id (ej: { id:1234 }), debe devolver la película con ese id.
        si el objeto tiene la propiedad search (que es un objeto) y:
            si el objeto search tiene la propiedad title, debe buscar las pelis que tengan ese string en el título.
             (ej: { search:{ title:"ju" } })
            si el objeto search tiene la propiedad tag, debe buscar las pelis que tengan ese tag.
             (ej: { search:{ tag:"action" } })
            puede recibir las dos opciones. (ej: { search:{ tag:"action", title:"x" } } busca pelis con el tag action y que tengan la letra x en su title)
        si no recibe ningún parámetro, debe devolver todas las películas.
    * add(peli:Peli) recibe un objeto y crea una peli en base a él.
     (Ej.: { id:4421, title:"Una peli", tags:["classic","action"] })

*/

import { PelisCollection, Peli } from "./models";

class PelisController {
  
  pelisCollection:PelisCollection
  
  
  constructor() {
    const pelisCollectionCtrl = new PelisCollection
    this.pelisCollection = pelisCollectionCtrl
  }
  
  get(options:any){
    if (typeof options.id === 'number' ) {
      return this.pelisCollection.getById(options.id)
    } else {
        return this.pelisCollection.search(options)
    }
    
    
  }
  
  add(options){
    return this.pelisCollection.add(options)
  }
  
  async processOptions(pelisOptions){
    if (pelisOptions.actions === "get" || pelisOptions.actions == "search") {
      return this.get(pelisOptions.params)
    } if (pelisOptions.actions === "add") {
      return this.add(pelisOptions.params)
    } else {
      return await this.pelisCollection.getAll()
    }
  }
}

export { PelisController};

// function main (){

//   const pruebaPelisController = new PelisController
//   const CtrlOpForId = new PelisControllerOptions("get",{"id":2})
//   console.log(pruebaPelisController.processOptions(CtrlOpForId))
  
//   const CtrlOpForSearch = new PelisControllerOptions("get",{"search":{ title:"ra" }})
//   //console.log("CtrlOpForSearch",CtrlOpForSearch)
//   console.log('resultado de search', pruebaPelisController.processOptions(CtrlOpForSearch))
  
//   //const pruebaPelisControllerOptionsSearchTags = new PelisControllerOptions("get",{"search":{ tags:"comedia" }})
//   // const pruebaPelisControllerOptionsAdd = new PelisControllerOptions("add",{ id:4422, title:"Una peli", tags:["classic","action"]})
//   // pruebaPelisController.get(pruebaPelisControllerOptionsSearchTags)
//   // pruebaPelisController.add(pruebaPelisControllerOptionsAdd)
//   //pruebaPelisController.pelisCollection.getAll()

// }

// main()