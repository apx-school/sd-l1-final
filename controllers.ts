import { PelisCollection, Peli } from "./models";

class ControllerOptions{
  id?: number;
  search?: {title?:string,tag?:string}
}

class PelisController {
  constructor() {
    this.pelis = new PelisCollection();
    this.promesa = this.pelis.load();
  }

  pelis: PelisCollection;
  promesa: Promise<any>;

  async get(options?: ControllerOptions): Promise<any>{
    await this.promesa;
    let resultado: any;
    if(!options) {resultado = await this.pelis.getAll()}else{
      if (options.id) resultado = await this.pelis.getById(options.id);
      if (options.search){
        if(options.search.title) this.pelis.data = await this.pelis.search({title: options.search.title});
        if(options.search.tag) this.pelis.data = await this.pelis.search({tag: options.search.tag});
        resultado = this.pelis.data;
        await this.pelis.load();
      }};
    return await resultado;
    }

    async add(peli: Peli){
      await this.promesa;
      const resultado = await this.pelis.add(peli);
      return resultado;
    }
  }

export { PelisController, ControllerOptions};

// async function main(){
//   const foo = new PelisController();
//   console.log(await foo.get({id: 24}));
//   console.log(await foo.get({search: {title:"THE", tag: "drama"}}));
//   console.log(await foo.get({search: {tag: "ACCIÓN"}}));
// }

// main();