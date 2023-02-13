import { PelisCollection, Peli } from "./models";
 type Options={
  id?:number;
  search?:{
    title?:string;
    tag?:string
  }
}
class PelisController {
  laMovie:PelisCollection
  constructor() {
    const modelo= new PelisCollection
    this.laMovie=modelo
  }
  async get(options?:Options){
    let coleccion:Peli[]|Peli=[]
    
    if(options.search){
    let pelicula = await this.laMovie.search(options.search)
    //console.log(pelicula)
       return coleccion= pelicula
  }
  if(options.id){
    let respuesta= await this.laMovie.GEtById(options.id)
//console.log(respuesta)
    return coleccion = respuesta
  }
    if(options!){
    const respuesta= await this.laMovie.getAll()
    //console.log(respuesta)
    return coleccion=respuesta
  }
    
  //console.log(coleccion)
  return coleccion
}

async add(pelicula:Peli){
 return await this.laMovie.add(pelicula)

}

}



//const prueba= new PelisController
//prueba.add({
//  id:7,
//  title:"Planeta del tesosro",
//  tags:["ficcion","espacio","saiborg","nave"]
//})

//prueba.get({search:{title:"d",tag:"ciencia"}})
//prueba.get({id:1})
//prueba.get()

//console.log(resp)
export { PelisController };
