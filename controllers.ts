import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() { this.collection = new PelisCollection();}

  get(options){
    if (options.id) {
      return this.collection.getById(options.id);
    } else if (options.search) {
      if (options.search.title && options.search.tag) {
        return this.collection.search({
          title:options.search.title,
          tag: options.search.tag })
      } else if (options.search.title) {
        return this.collection.search({
          title: options.search.title })
      } else if (options.search.tag) {
        return this.collection.search({
          tag:options.search.tag })
      }
    } else { return this.collection.getAll(); }
  }

  add(peli: Peli){
    return this.collection.add(peli);
  }
}
export { PelisController };
