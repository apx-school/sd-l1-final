import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  get(options?: any): Promise<any> {
    if (!options) {
      return this.pelisCollection.getAll();
    } else {
      if (options.id) {
        return this.pelisCollection.getById(options.id);
      }
      if (options.search.title && options.search.tag) {
         const primerFiltro = this.pelisCollection.search({title: options.search.title});
         return primerFiltro.then((resultado)=>{
           return resultado.filter((item)=>{
            return item.tags.includes(options.search.tag);
           });
         });
      } else {
        if (options.search.title || options.search.tag) {
          return this.pelisCollection.search(options.search);
        }
      }
    }
  }
  add(peli: Peli) {
    return this.pelisCollection.add(peli);
  }
}
export { PelisController };
