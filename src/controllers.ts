import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  }
}

class PelisController {

  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  // Metodo para procesar opciones

  /* async get(options?: Options){

      const pelis = await this.pelisCollection.getAll();

      // Caso que tenga id
      if(options?.id){
        const peliBuscada = this.pelisCollection.getById(options.id);
        return peliBuscada;
      }
      // Caso que tenga título
      if(options?.search?.title){
        return pelis.filter(peli => peli.title.toLowerCase().includes(options.search.title.toLowerCase()));
      }
      // Caso que tenga tag
      if(options?.search?.tag){
        return pelis.filter(peli => peli.tags.includes(options.search.tag));
      }
      // Caso que tenga titulo Y tag
      if(options?.search?.title && options?.search?.tag){
        return pelis.filter(peli => peli.title.toLowerCase().includes(options.search.title.toLowerCase()) && peli.tags.includes(options.search.tag));
      }
      return pelis;
    }; */

    async get(options?: Options){

      const pelis = await this.pelisCollection.getAll();
      
      let pelisBuscada;

      // Caso que tenga id
      if(options?.id){
        const peliBuscada = await this.pelisCollection.getById(options.id);
        return peliBuscada;
      }
      // Caso que tenga título
      if(options?.search?.title){
        pelisBuscada = this.pelisCollection.search({title: options.search?.title});        
        return pelisBuscada;
      }
      // Caso que tenga tag
      if(options?.search?.tag){
        pelisBuscada = this.pelisCollection.search({tag: options.search.tag});
        return pelisBuscada;
      }
      // Caso que tenga titulo Y tag
      if(options?.search?.title && options?.search?.tag){
        pelisBuscada = this.pelisCollection.search({title: options.search?.title, tag: options.search?.tag});
        return pelisBuscada;
      }

      if(options?.search?.title && options?.search?.tag){
        for(const peli of pelis){
          if(peli.title.toLowerCase().includes(options.search.title.toLowerCase())){
            if(peli.tags.includes(options.search.tag)){
              pelisBuscada.push(peli);
            }
          }
        }
        return pelisBuscada;
      }

      return pelis;
    };
  

  async add(peli: Peli){
    try{
      const peliculaNueva = await this.pelisCollection.add(peli);
      console.log("Se agrego la pelicula: ", peliculaNueva);
      
    } catch(err){
      console.error("Error al agregar pelicula", err);
    }
  }

}
export { PelisController };