import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promesa: Promise <any>
  
  constructor() {
    const pelis = new PelisCollection();
    this.pelis = pelis;
    var promesa = this.pelis.getAll();
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
          resultado = this.pelis.getAll().then((res)=>{
            return res;
          })
        }
        return resultado;
      }
  
      add(peli:any){
    
        return this.pelis.add(peli); 
      }
      }
  
  
  export { PelisController }; 
  