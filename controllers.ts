import { PelisCollection, Peli } from "./models";

class PelisController {

Pelis: PelisCollection;

  constructor() {
    this.Pelis = new PelisCollection()
  }
 async get(options):Promise <any>{
  
   if (options.id){ return await this.Pelis.getById(options.id)}
   if (options.search){ return await this.Pelis.search(options.search)}
   if (options.empty){return await this.Pelis.getAll()}
 }
 async add(peli:Peli){ return await this.Pelis.add(peli)}
 }


export { PelisController };
