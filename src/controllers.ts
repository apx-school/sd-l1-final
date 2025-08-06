import { error } from "console";
import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number; 
  search?: {
    title?: string; 
    tag?: string; 
  };
};

class PelisController {
  model : PelisCollection
  constructor() {
    this.model = new PelisCollection();
  }
  async get(options?: Options): Promise<Peli[]> {
    const pelis = await this.model.getAll()
    if(!options){
      return pelis
    }
   return pelis.filter((peli) => {
  let coincide = true;
  if (options.id) {
    coincide = coincide && peli.id === options.id;
  }
  if (options.search) {
    if (options.search.title) {
      coincide = coincide && peli.title && peli.title.includes(options.search.title);
    }
    if (options.search.tag) {
      coincide = coincide && peli.tags && peli.tags.includes(options.search.tag);
    }
  }
  return coincide;
});

  }
  async getOne(options: Options): Promise<Peli | undefined> {
  const resultados = await this.get(options); // Asegúrate de usar await
  return resultados[0]; // Devuelve el primer resultado o undefined
 }

  async add(peli: Peli): Promise<boolean> {
  if (!peli.id && !peli.title && !Array.isArray(peli.tags)) {
    throw new Error("El objeto peli debe tener id, title y tags como un array");
  }

  try {
    return await this.model.add(peli);
  } catch (error) {
    console.error("Error al agregar la película:", error);
    return false; // O manejar el error de otra forma
  }
}




}
export { PelisController };