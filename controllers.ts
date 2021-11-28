import { PelisCollection, Peli } from "./models";


class PelisController {

  coleccionDePelis: PelisCollection;
  
  constructor() {
    this.coleccionDePelis = new PelisCollection();
  }

  get(options?:any){

    if(!options){
      return this.coleccionDePelis.getAll()  ;
    }

    if(options.id){
      return this.coleccionDePelis.getById(options.id);
    } else if (options.search){
      if(options.search.title && options.search.tag){
        return this.coleccionDePelis.search({title: options.search.title}).then( data => {
          return this.coleccionDePelis.search({tag: options.search.tag}).then( peli => {
            return(data.filter( dato => {
              return peli.find( peli => peli.id === dato.id);
            }));
          });
        });

      } else if (options.search.title){
        return this.coleccionDePelis.search(options.search);
      } else if (options.search.tag){
        return this.coleccionDePelis.search(options.search);
      }
    } else {
      return this.coleccionDePelis.getAll();
    }

  }

  add(peli:Peli){
    this.coleccionDePelis.add(peli);
  }
}

export { PelisController };
