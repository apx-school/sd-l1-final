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
      
     if (options.search) {
      return this.peliculas.search(options.search);
    } 
    else {
      return this.peliculas.getAll();
    }
  
     
  }
  add(peli:Peli){
    return this.peliculas.add(peli)
  }
}
export { PelisController };

//const prueba = new PelisController();
//prueba.get({search:{title:"a",tag:"terror"}}).then((item)=>{
  //console.log(item)
//})

