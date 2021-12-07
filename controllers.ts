import { PelisCollection, Peli } from "./models";

class PelisControllerOptions{
  action: "search" | "id"
}

class PelisController {
 data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }

  get(options:any){
    var result;
    if (options.id) {
      result = this.data.getById(options.id)
    }else if (options.search.title && options.search.tags) {
      result = this.data.search(options.search.title && options.search.tags)
    }else if (options.search.title) {
      result = this.data.search(options.search.title)
    }else if (options.search.tags) {
      result = this.data.search(options.search.tags)
    }
    else {
      result = this.data.getAll();
    }
  return result;
  }

  add(peli:Peli){
    this.data.add(peli);
  }

}
export { PelisController };
