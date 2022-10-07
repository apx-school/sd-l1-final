import { PelisCollection, Peli } from "./models";
import * as fs from "fs";

class PelisController {
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }
  async get(options: any):Promise<any> {
    if (options.id) {
      return await this.peliculas.getById(options.id);
    } else if (options.search) {
      return await this.peliculas.search(options.search);
    } else if (options) {
      return await this.peliculas.getAll();
    }
  }
  async add(peli: Peli): Promise<boolean> {
    return await this.peliculas.add(peli);
  }
}


export { PelisController };
