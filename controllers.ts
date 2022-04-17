import { PelisCollection, Peli } from "./models";

class PelisController {
  __listaPeliculas : PelisCollection = new PelisCollection;

  constructor() {

  }

  async get(options:any) : Promise<any> {
    if(options["id"]){
      return this.__listaPeliculas.getById(options["id"]);
    }

    if(options["search"]){
      if(options["search"]["title"] || options["search"]["tag"]){
        return this.__listaPeliculas.search(options["search"]);
      }
    }

    return this.__listaPeliculas.getAll();
  }

  async add(peli:Peli) : Promise<boolean> {
    return this.__listaPeliculas.add(peli);
  }
}
export { PelisController };
