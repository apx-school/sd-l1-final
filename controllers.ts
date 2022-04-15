import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>
  constructor() {
    this.pelis = new PelisCollection();
    const promesa = this.pelis.getAll();
    this.promesa = promesa;
  }

  get(options:any){
  let resultado: Promise<any>;
    if(options.get){
       resultado = this.pelis.getById(options.get);
    }else if(options.add){
      resultado = this.pelis.add(options.add);
      }else if(options.id){
        resultado = this.pelis.getById(options.id);
      }else if(options.search){
        resultado = this.pelis.search(options.search)
      }else{
        resultado = this.pelis.getAll().then((res=>{
          return res;
        }))
      }
      return resultado;
    }

    add(peli:Peli){
      const peliculas = new Peli();
      peliculas.id = peli.id;
      peliculas.title = peli.title;
      peliculas.tags = peli.tags;  
      return this.pelis.add(peli); 
    }
    }
  

export { PelisController };