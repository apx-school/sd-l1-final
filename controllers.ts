import { PelisCollection, Peli } from "./models";

class PelisController{
   peliculas:PelisCollection;
   constructor(){
    this.peliculas=new PelisCollection();
   };


    async get(options:any){
      if(options.id){
        return await this.peliculas.getById(options.id);
      }
      if(options.search){
        return await this.peliculas.search(options.search);
      }
      if(options.search){
        return await this.peliculas.getAll();
      }
    }


    async add(peli:Peli){
      return await this.peliculas.add(peli);
    };
    
  }

  export { PelisController } ;
  
  

