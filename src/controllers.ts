import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tags?: string[];
  };
};

export type PelisControllerOptions = {
  action?: "get" | "add" | "search" | null | "" | undefined;
  params?:any;
};


class PelisController {

  coleccion: PelisCollection;

  constructor() {
    this.coleccion = new PelisCollection();
  }

  async get(options?:PelisControllerOptions){

    try{
      var result;

    if(options.action === undefined){
        //console.log('entro a devolver todas las pelis')
        result = await this.coleccion.getAll();
    }else if(options.action === "get" && options.params){
        //console.log('entro al get')
        //console.log(options.params._)
        result = await this.coleccion.getById(options.params._[0]);
    }else if(options.action === "search" && options.params.tag && options.params.title){
        //console.log('entro al search por tag y search')
        //console.log(options.params)
        result = await this.coleccion.search(options.params)
  }else if(options.action === "search" && options.params.title){
        //console.log('entro al search por titulo')
        result = await this.coleccion.search(options.params);
    }else if(options.action === "search" && options.params.tag){
        //console.log('entro al search por tag')
        //console.log(options.params)
        result = await this.coleccion.search(options.params);
    }else if(options.action === "add"){
        //console.log('entro al add')
        result = this.coleccion.add(options.params)
    }

      return result;
    }catch (error) {
      console.error("Error:", error);
      throw error; // Rechaza la promesa con el error original
    }
  
  }

  /*add(peli:Peli){
    
     this.coleccion.add(peli)

  }*/

}

const test = new PelisController;
//test.processOptions({action:"search", params:{title:"Minio"}});
// test.processOptions({action:"search", params:{tag:"comedia"}});
// test.processOptions({action:"search", params:{title:"wift",tag:"comedia"}});
//test.get({action:"get", params:{"id":2}});
//test.get();




export { PelisController };
