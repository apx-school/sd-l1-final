import * as jsonfile from "jsonfile";
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
    let resultado: Peli[] = [];
    try {
      if (options?.id) {
        const peli = await this.model.getById(options.id);
        if (peli) {
          resultado.push(peli);
        }
      }
      if (options?.search) {
        const searchResaults = await this.model.search(options.search);
        if (searchResaults) {
          resultado.push(...searchResaults);
        }
      }
      if (!options) {
        resultado = await this.model.getAll();
      }
    } catch (error) {
      console.error("Error al obtener películas:", error);
    }
    return resultado;
  }
  async getOne(options: Options): Promise<Peli | null> {
    const resultados = await this.get(options);

    if (resultados.length === 0) {
      return null;
    }

    return resultados[0];
  }

  async add(peliData: { id: number; title: string; tags: string[] }) {
    const peli: Peli = {
      id: peliData.id,
      title: peliData.title,
      tags: peliData.tags,
    };
    const resultado = await this.model.add(peli);

    if (resultado) {
      console.log("Película agregada con éxito:", peli);
    } else {
      console.log("Error al agregar la película, puede que el ID ya exista");
    }
  }

  async processOptions(option): Promise<any> {
    let resultado;
    if (option._[0] === "add") {
      const peli = {
        id: option.id,
        title: option.title,
        tags: Array.isArray(option.tags) ? option.tags : [option.tags],
      };
      resultado = await this.add(new Peli(peli.id, peli.title, peli.tags));
    } else if (option.id) {
      resultado = await this.getOne({ id: option.id });
    } else if (option.search) {
      resultado = await this.get(option);
    }
    return resultado;
  }
}

export { PelisController, Options };
