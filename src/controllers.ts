import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: { title?: string; tag?: string };
};

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }

  //Metodo de busqueda por title, por tag, por ambos o por id
  async get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      const peliculaEncontrada = await this.model.getById(options.id);
      return peliculaEncontrada ? [peliculaEncontrada] : [];
    } else if (options?.search.title && options?.search.tag) {
      const peliculaEncontada = await this.model.search(options.search);
      return peliculaEncontada;
    } else if (options?.search.title) {
      const peliculaEncontada = await this.model.search(options.search);
      return peliculaEncontada;
    } else if (options?.search.tag) {
      const peliculaEncontada = await this.model.search(options.search);
      return peliculaEncontada;
    } else {
      const peliculaEncontada = await this.model.getAll();
      return peliculaEncontada;
    }
  }
 //Metodo de busqueda, obtiene solo de a un resultado
  async getOne(options: Options): Promise<Peli | undefined> {
    const pelis = await this.get(options);
    return pelis[0];
  }

  //Metodo para agregar peliculas al archivo json
  async add(peli: Peli) {
    return await this.model.add(peli);
  }
}

export { PelisController };

//Pruebas
//const objeto = new PelisController();

//Prueba metodo getOne
//objeto.getOne({ search: { title: "M" } }).then((peli) => console.log(peli));

//Prueba metodo get
//objeto.get({id: 3 }).then((peli) => console.log(peli));

//Prueba metodo Add
/*objeto.add({ 

  id: 6, 
  title: "Una peli", 
  tags: ["classic", "action"] 

}).then((peli) => console.log(peli));*/
