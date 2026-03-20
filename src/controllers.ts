import { PelisCollection, Peli } from "./models";

class PelisController {
  private model: PelisCollection;

  constructor (model?:PelisCollection) {
    this.model = model ?? new PelisCollection();
  }

  get(options: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli[]> | Promise<Peli> {
    if (options.id !== undefined) {
      return this.model.getById(options.id);
    } else if (options.search !== undefined) {
      return this.model.search(options.search);
    } else {
      return this.model.getAll();
    }
  }

  async getOne(options: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli | undefined> {
  const result_1 = await this.get(options);
  if (Array.isArray(result_1)) {
    return result_1[0]; // Devuelve el primer elemento si es un array
  }
  return result_1;
}

add(peli: Peli): Promise<boolean> {
  return this.model.add(peli);
}
}

export { PelisController };

