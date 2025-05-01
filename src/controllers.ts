import { title } from "process";
import { PelisCollection, Peli, SearchOptions } from "./models";
import { promiseHooks } from "v8";

export type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string[]; // Cambiado a array de strings
  };
};

class PelisController {
  instanciaPelisCollection: PelisCollection
  constructor() {
    this.instanciaPelisCollection = new PelisCollection()
  }

  get = async (options: Options): Promise<Peli[]> => {
    /// el primer if busca por el id, para eso necesita que sea un numero 

    if (typeof options.id === "number" && (typeof options.search.title === 'undefined' && typeof options.search.tag === 'undefined')) {
      const pelis = await this.instanciaPelisCollection.getByID(options.id)
      return [pelis]
    }

    /// el segundo if va a buscar por tag o por title si este tiene los dos , lo bucara por los dos , siempre y cuando no hay id
    // La condición typeof options.search.tag === 'object' funciona para detectar un array
    if (( typeof options.search.tag === 'object' || typeof options.search.title === 'string') && (typeof options.id === 'undefined') ){
      // Asegurémonos de que searchOptions coincida con lo que espera PelisCollection.search
      // Necesitaremos revisar PelisCollection.search a continuación.
      const searchOptions = {
        title: options.search.title,
        tag: options.search.tag // Pasamos el array de tags
      };
      const search = await this.instanciaPelisCollection.search(searchOptions);
      return search;
    }
    
    
    if (options === undefined) {
      const all = await this.instanciaPelisCollection.getAll()
      return all
    }

  }

  getOne = async (options: Options): Promise<Peli> => {

    return await this.instanciaPelisCollection.getByID(options.id)

  }


  add = async (peli: Peli) => {
    return await this.instanciaPelisCollection.add(peli)

  }

}
export { PelisController };
