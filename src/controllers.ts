import { PelisCollection, Peli, SearchOptions } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  //////////////////////
  //  PROCESS OPTIONS //
  //////////////////////

  async processOptions(param: Options | Peli) {
  
    if ("id" in param && !("search" in param)) {
      // Objeto tipo Peli - agrego una nueva peli
      const success = await this.add(param as Peli); // Casteo
      return success;
    } else {
      // Objeto tipo Options - busco por id o por search
      const result = await this.get(param);
      return result;
    }
  }

  //////////////////////
  //       GET        //
  //////////////////////

  async get(options?: Options): Promise<Peli[]> {
    //Si no encuentra nada devuelve un array vacío
    //Y si no recibe ningún parámetro, debe devolver todas las películas

    if (options.id) {
      //si tiene id ya no interesa si se completaron las otras opciones, el id es único, hago else para las otras opciones
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : []; // Se retorna un array con la peli o un array vacío si no existe
    } else if (options.search) { //si options = {}, options.search.title es undefined y arroja error
      if(options.search.title || options.search.tag) {
        //armo el objeto que utiliza search
        // Creamos un objeto vacío para searchOptions
        const searchOptions: SearchOptions = {};
  
        // Agregamos propiedades solo si existen en options.search
        if (options.search.title) {
          searchOptions.title = options.search.title;
        }
        if (options.search.tag) {
          searchOptions.tag = options.search.tag;
        }
  
        // Llamamos al método search del modelo con el nuevo objeto
        return await this.model.search(searchOptions);
    }
    } else {
      //no se pasaron parámetros, devuelvo todo

      return await this.model.getAll();
    }
  }

  //////////////////////
  //     GET  ONE     //
  //////////////////////

  async getOne(options: Options): Promise<Peli | undefined> {
    const pelis = await this.get(options);
    return pelis[0];
  }

  //////////////////////
  //     ADD          //
  //////////////////////

  async add(peli: Peli) {
    await this.model.add(peli);
  }
}

export { PelisController, Options };
