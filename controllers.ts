import { PelisCollection, Peli } from './models';

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options: any) {
    let resultado;
    if (options.id) {
      resultado = this.pelis.getById(options.id);
    }
    if (options.search) {
      if (options.search.title && options.search.tag) {
        resultado = this.pelis.search({
          title: options.search.title,
          tag: options.search.tag,
        });
      } else if (options.search.title) {
        resultado = this.pelis.search({ title: options.search.title });
      } else if (options.search.tag) {
        resultado = this.pelis.search({ tag: options.search.tag });
      }
    }
    return resultado;
  }
  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
