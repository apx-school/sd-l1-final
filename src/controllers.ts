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

  get(options?: Options): Peli[] {
    const resultado = [];
    if (options.id) {
      const conId = this.model.getById(options.id).then((result) => {
        return result;
      });
      resultado.push(conId);
    } else if (options.search) {
      const conTitle = this.model.search(options.search).then((result) => {
        return result;
      });
      resultado.push(conTitle);
    } else {
      const todas = this.model.getAll().then((result) => {
        return result;
      });
      resultado.push(todas);
    }

    return resultado;
  }
  getOne(options:Options):Peli{
    return this.get[0];
  }
  add(peli:Peli){
    this.model.add(peli).then((result)=>{
      return result
    })
  }
}
export { PelisController };
