import { title } from "process";
import { Peli,PelisCollection,SearchOptions } from "./models";

type Options = {
    id?: number;
    search?: {
      title?: string;
      tag?: string;
    };
  };

class PelisController {
    pelis:PelisCollection
    constructor() {
        const instancia = new PelisCollection()
        this.pelis = instancia
        this.pelis.getAll()
    }
    async get(options?:Options) {
        await this.pelis.getAll()
        let resultado:any;
        if(!options) {
            resultado = this.pelis.getAllPelis()
        } else if(options.id) {
            resultado = this.pelis.getById(options.id)
        } else if(options.search.title && options.search.tag) {
            resultado = this.pelis.search(options.search)
        } else if(options.search.title) {
            resultado = this.pelis.search(options.search)
        } else if(options.search.tag) {
            resultado = this.pelis.search(options.search)
        }
        return resultado
    }
    async add(peli:Peli) {
        await this.pelis.getAll()
        await this.pelis.add(peli)
    }
}

export {PelisController}

