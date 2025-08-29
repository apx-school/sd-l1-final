import { PelisCollection, Peli } from "./models";

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

  async get(options?: Options): Promise<Peli[]> {
    // 1. Si tiene id → buscar por id
    if (options && options.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    // 2. Si tiene search → filtrar
    if (options && options.search) {
      const allPelis = await this.model.getAll();
      let resultado = allPelis;

      // Filtro por title (si existe)
      if (options.search.title) {
        resultado = resultado.filter((p) =>
          p.title.toLowerCase().includes(options.search.title.toLowerCase())
        );
      }

      // Filtro por tag (si existe)
      if (options.search.tag) {
        resultado = resultado.filter((p) =>
          p.tags.includes(options.search.tag)
        );
      }

      return resultado;
    }

    // 3. Si no hay opciones → devolver todas
    return await this.model.getAll();
  }

  async getOne(options: Options): Promise<Peli | undefined> {
    const resultado = await this.get(options);
    return resultado[0]; // devuelve el primer elemento o undefined si no hay nada
  }

  async add(peli: Peli): Promise<boolean> {
    // 1. Verificar si ya existe la peli con ese id
    const peliExistente = await this.model.getById(peli.id);

    if (peliExistente) {
      // Ya existe una peli con ese id → no la agrego
      return false;
    }

    // 2. Si no existe → la agrego
    await this.model.add(peli);
    return true;
  }
}
export { PelisController };
