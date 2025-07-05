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
    const lista = await this.model.getAll();

    const listaFiltrada = lista.filter((p) => {
      if (!options) return true;

      if (options.id) {
        return p.id === options.id;
      }

      if (options.search && options.search.tag && options.search.title) {
        const titleMatch = p.title
          .toLowerCase()
          .includes(options.search.title.toLowerCase());

        const tagMatch = p.tags
          .map((t) => t.toLowerCase())
          .includes(options.search.tag.toLowerCase());

        return titleMatch && tagMatch;
      } else if (options.search && options.search.title) {
        return p.title
          .toLowerCase()
          .includes(options.search.title.toLowerCase());
      } else if (options.search && options.search.tag) {
        return p.tags
          .map((p) => p.toLowerCase())
          .includes(options.search.tag.toLowerCase());
      }

      return true;
    });

    return listaFiltrada;
  }

  async getOne(options: Options): Promise<Peli> | null {
    const resultado = await this.get(options);
    return resultado.length > 0 ? resultado[0] : null;
  }

  async add(peli: Peli): Promise<boolean> {
    if (typeof peli.id !== "number" || peli.id <= 0) {
      console.log("ID inválido");
      return false;
    }

    if (!peli.title || peli.title.trim() === "") {
      console.log("Título inválido");
      return false;
    }

    const peliAgregada = await this.model.add(peli);

    if (!peliAgregada) {
      console.log(
        "No se pudo agregar la película. Puede que el ID esté duplicado o haya un error."
      );
      return false;
    }

    console.log("Película agregada con éxito");
    return peliAgregada;
  }
}

export { PelisController };
