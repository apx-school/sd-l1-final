import { PelisCollection, Peli } from "./models";



class PelisController {
  peliculas:PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection()
  }
  get(options){                                             
     if (options.id){                                     
       return this.peliculas.getById(options.id)
     }
      
    else  if(options.search){
       return this.peliculas.search(options.search)
     }
     else if(options.search){
       return this.peliculas.search(options.search)
     }
  
     
  }
  add(peli:Peli){
    return this.peliculas.add(peli)
  }
}
export { PelisController };

//const prueba = new PelisController();
//prueba.add({id: 445,title: 'Título de la nueva peli',tags: [ 'action', 'classic' ]}).then((item)=>{
  //console.log(item)
//})

