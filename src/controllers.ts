import { PelisCollection, Peli } from "./models";
   type Options = {
    id?: number;
    search?: {
      title?: string;
      tag?: string;
    }}
class PelisController {
  pelisCollection: PelisCollection
  constructor() {
    this.pelisCollection = new PelisCollection
  }
 
  async  get(options?: Options){
 
    if(options?.id){
     const peliPorId = await this.pelisCollection.getById(options.id)
     if(options?.search){
      const porSearch = await this.pelisCollection.search(options.search)
      return porSearch.filter(peli => peli.id === peliPorId.id)
     } return peliPorId
    }else if(options?.search){
      return await this.pelisCollection.search(options.search)
    }else{
      return await this.pelisCollection.getAll()}
    
  
}
async add(peli: Peli) {
  const resultado = await this.pelisCollection.add(peli);
  return resultado;
}
}
export { PelisController };
