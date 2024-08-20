import { PelisCollection, Peli, SearchOptions } from "./models";

export type Options = {
  id?: number;
  search?: SearchOptions;
};

class PelisController {
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }

  get = async (options?: Options): Promise<Peli[]> => {

    try {
      if (options?.id) {
        const peli = await this.peliculas.getById(options.id);
        return [peli]; // Retorna un arreglo con un solo objeto o vacío
      } else if (options?.search) {
        return await this.peliculas.search(options.search); // Retorna un arreglo de películas
      }
      return []; // Retorna un arreglo vacío si no hay opciones
    } catch (error) {
      console.error("Error en get:", error);
      throw new Error("No se pudo obtener la película");
    }
  }
  
  add = async (peli: Peli) => {
    try {
      const resultado = await this.peliculas.add(peli);
      return resultado; // Retorna el resultado de la operación
    } catch (error) {
      console.error("Error al agregar la película:", error);
      throw new Error("No se pudo agregar la película"); // Lanza un error para que pueda ser manejado más arriba
    }
  }
}


// (async () => {    
//   const prue1 =  new PelisController();
//   const obj = {id: 4321865}
//   console.log(await prue1.get(obj))
// }) ();

(async () => {
  // testeo peli agregada desde el script test del package
  const controller = new PelisController();
  const peli = await controller.get({ id: 4321865 });
  console.log(peli[0].title)
})();
export { PelisController };
