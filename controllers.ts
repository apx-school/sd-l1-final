import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection
  constructor() {
    this.peliculas = new PelisCollection();
  }

  get(options:any): Promise<any>{
    var resultado
    if(options.id){
     resultado = this.peliculas.getById(options.id).then((item)=>{
        return item;
      });

    } 
  else if(options.search ){
      resultado = this.peliculas.search(options.search).then((item)=>{
        return item;
      });
    }
   else{
     resultado = this.peliculas.getAll().then((item)=>{
        return item;
      })
    }
    return resultado;
}

  add(peli:Peli): Promise<boolean>{
    return this.peliculas.add(peli).then((p)=> {return p})
  }

}


export { PelisController };
