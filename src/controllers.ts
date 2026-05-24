import { PelisCollection, Peli } from "./models";

// Definimos el tipo de opciones
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
    // Inicializamos el modelo para poder usar sus métodos (getAll, getById, add, search)
    this.model = new PelisCollection();
  }

  // 1. Método get
  get(options?: Options): Promise<Peli[]> {
    // Si no pasaron opciones (undefined), devolvemos todo:
    if (!options) {
      return this.model.getAll();
    }

    // Si pasaron la propiedad ID, buscamos por ID explícitamente.
    // acorde a la consiga, debemos devolver siempre un array.
    if (options.id !== undefined) {
      return this.model.getById(options.id).then((peli) => {
        return peli ? [peli] : [];
      });
    }

    // Si pasaron la propiedad search (puede traer title, tag o ambos)
    if (options.search) {
      return this.model.search(options.search);
    }

    // Caso de respaldo por si pasan un objeto de opciones vacío {}
    return this.model.getAll();
  }

  // 2. GetOne: Reutiliza el get de arriba pero devuelve solo el primer elemento
  getOne(options: Options): Promise<Peli | undefined> {
    return this.get(options).then((resultadoArray) => {
      return resultadoArray[0];
    });
  }

  // 3. Add:
  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController };
