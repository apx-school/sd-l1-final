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
    this.pelisCollection = new PelisCollection
  };
  
  get(options:any):Promise<any>{

    const valor:any = Object.values(options)[0]
    if (Object.keys(options)[0] === "id") {
      // console.log("estoy en id",valor)
      return this.pelisCollection.getById(valor).then((data) => {return data})
    } if (Object.keys( valor)[0] == "title" || Object.keys( valor)[0] == "tags" ) {
      // console.log("estoy en search",options.search)
      return this.pelisCollection.search(options.search).then((data)=>{return data})
    } else {
      return this.pelisCollection.getAll().then((data)=>{return data})
      }
    }
    
  add(peli:Peli): Promise<any>{
    return this.pelisCollection.add(peli).then((data)=>{return data})
  }

}

export { PelisController};



// function main () {
//   console.log("MAIN de CONTROLLERS PAPA............... ")

//     const hola = new PelisController
//     const obj1 = {search: {'title': "n"}};
//     const obj2 = {search: {title: "una"}};
//     const obj3 = {};
//     const obj4 = {search: {tags: "tt"}};
//     const obj5 = [obj1,obj3,obj4]
//     const obj6 = {search: { title: 'ti', tag: 'uu' }}
//     const obj7 = {get: {id:4321865}}
//     const obj8 = { id: 123, title: "carli jonessssssssssssssssssssssssss", tags: []}

// //    hola.get(obj3).then(console.log).then(texto => {console.log("esofuegetall")})

//     hola.get(obj7.get).then(console.log).then(texto => {console.log("getbyid")})

//     // hola.get(obj2).then(console.log).then(texto => {console.log("esofuesearchtitle")})

//     // hola.get(obj4).then(console.log).then(texto => {console.log("esofuesearchtag")})

//     // hola.get(obj6).then(console.log).then(texto => {console.log("esofuesearchtitleytag")})

//     // hola.add(obj8).then(console.log).then(texto => {console.log("esofueadd")})


// }

// main()

