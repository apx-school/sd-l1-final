import { PelisCollection, Peli } from "./models";


class PelisController {
  peliculas:PelisCollection
  promesa: Promise <any>
  constructor() {
    let pelis = new PelisCollection
    this.peliculas = pelis
    const laPreomesa = this.peliculas.getAll();
    this.promesa = laPreomesa;
  }
  
  get(options){
  return this.promesa.then(()=>{
  
    let respuesta;
   
    if(typeof options === "number"){
      respuesta = this.peliculas.getById(options)
    }
   else if (options.hasOwnProperty("id")){
      respuesta = this.peliculas.getById(options.id)
    }  
   else if (options.hasOwnProperty("title")){
    respuesta = this.peliculas.search(options)
    }
   else if (options.hasOwnProperty("tag")){
      respuesta = this.peliculas.search(options)
    } 
    else if (options.search.hasOwnProperty("title")){
      respuesta =this.peliculas.search(options.search)
    }
     else if (options.search.hasOwnProperty("tag")){
      respuesta = this.peliculas.search(options.search)
    } else {respuesta = this.peliculas}

    return respuesta;    
   })
   
  };

  
add(object){
return this.promesa.then(()=> {
  let pelicula = new Peli
 pelicula.id = object.id
 pelicula.tags = object.tags
 pelicula.title = object.title
 
 return this.peliculas.add(pelicula)
 })
 
 };

};

export { PelisController };


// async function prueba() {
//  const prueba = new PelisController
//  await prueba.add({
//   id: 77,
//   title: "otra peli un poco más divertida",
//   tags: ["SOME_TAG"],
// });
// const pelis = await prueba.get({
//   search: { title: "peli", tag: "SOME_TAG" },
// });
// console.log(pelis);

// }

// prueba()
  

