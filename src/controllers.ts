import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model:PelisCollection
  constructor() {
    this.model = new PelisCollection("./src/pelis.json");
  }
  async get(options?:Options):Promise<Peli[]>{
    const peliculas:Peli[] = await this.model.getAll();
    if(options){

      const byId = options.id
      ? peliculas.filter((p) =>p.id === options.id)
      : [];

      const byTitle = options.search
      ? options.search.title
        ? peliculas.filter((p) => p.title.includes(options.search.title))
        : [] 
      : [];

      const byTag = options.search
      ? options.search.tag
        ? peliculas.filter((p) => p.tags.includes(options.search.tag))
        : []
      : [];

      const map = new Map<number, Peli>();
      for (const peli of [...byId, ...byTitle, ...byTag]) {
        map.set(peli.id, peli);
      }
      if((options.search) && (options.search.tag) && (options.search.title)){
        return Array.from(map.values()).filter((p) =>
          p.title.includes(options.search.title) && p.tags.includes(options.search.tag)
        )
      }else 
        return Array.from(map.values());
    }else 
      return peliculas;
  }
  getOne(options:Options):Promise<Peli| null>{
    return this.get(options).then((data) => data[0]).catch(() => null)
  }
  //Funcion que agrega un pelicula a una colleccion de Peliculas
  //Post: devuelve true en caso de que la introduccion sea correcta, en caso contrario devuelve false.
  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}
export { PelisController };
