import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis : PelisCollection;
  promesa: Promise<any>

  constructor() {
   this.pelis = new PelisCollection();
   const promesa = this.pelis.getAll();
   this.promesa = promesa;
  }

  get(options:any){
    var resultado:Promise<any>;
     if(options.add){
       resultado = this.pelis.add(options.add).then((r) =>{
         return r;
       })
      }else if(options.search){
        resultado = this.pelis.search(options.search).then((re)=>{
          return re;
        })
      }else if(options.id){
        resultado = this.pelis.getById(options.id).then((res)=>{
          return res;
        })
      }else if(options.get){
        resultado = this.pelis.getById(options.get).then((resul)=>{
          return resul;
        })
      }else {
      resultado = this.pelis.getAll().then((resultadoDos) =>{
        return resultadoDos;
      });
      return resultado;
    }
  }

  add(peli:Peli){
    const peliculas = new Peli();
    peliculas.id = peli.id;
    peliculas.title = peli.title;
    peliculas.tags = peliculas.tags;
    return this.pelis.add(peli);
  }

}
export { PelisController };
