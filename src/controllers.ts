import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number,
  search?:{
    title?:string,
    tag?:string
  }
};

class PelisController {
  model:PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }

  async get(param: Options){
    if (param.id){
      const peliId = this.model.getById(param.id).then(
        (resp) => {return [resp]});
      return peliId;
    } else if (param.search){
      const pelisSearch = await this.model.search(param.search);
      return pelisSearch;
    } else {
      return await this.model.getAll()
    };
  }

  async getOne(param: Options){
    const primerResultado = await this.get(param)
    return primerResultado[0];
  }

  async add(peli: Peli){
    const algo = await this.model.add(peli);
    return algo;
  }
}

export { PelisController };