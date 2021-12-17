import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;

  constructor() {
    this.data = new PelisCollection();
  }

  get(options?) {
    var resultado;
    if (options.id) {
      resultado = this.data.getById(options.id);
    } else if (options.search.title && options.search.tag) {
      return this.data.search({tag:options.search.tag}).then((res)=>{
      resultado = res.filter((peli)=>{
        return peli.title.includes(options.search.title)
      })
      return resultado
    })
    } else {
      resultado = this.data.getAll();
    }

    return resultado;
  }
  add(peli: Peli) {
    this.data.add(peli);
  }
}

export { PelisController };
