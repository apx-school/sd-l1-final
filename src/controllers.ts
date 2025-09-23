
import { PelisCollection, Peli } from "./models";



type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};



class PelisController {
  models:PelisCollection
  constructor() {
    this.models=new PelisCollection()
  }
  async get(options:Options={}):Promise<Peli[]>{
   
   let resultado:Peli[]=[]

    if(options.id){
     const peli=  await this.models.getById(options.id)
     if(peli){
      resultado.push(peli)
     }

    }
    else if(options.search){
    const pelis=  await this.models.search(options.search)
    resultado=resultado.concat(pelis)

    }
    else{
      const pelis=await this.models.getAll()
      resultado=resultado.concat(pelis)
    }
   
    return resultado
  
}
 async getOne(options:Options):Promise<Peli> {
   
    const resultado= await this.get(options);

    return resultado[0]

  }
 add(peli: Peli): Promise<boolean> {
  const resultado =   this.models.add(peli);
    return resultado;
}

}
export { PelisController };



