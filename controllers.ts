import { PelisCollection, Peli } from "./models";

class PelisController {
  peli: PelisCollection
  constructor() {
    this.peli = new PelisCollection
  }
  async get(options:any){
    if (options.id) {
         return await this.peli.getById(options.id)
    }else if (options.search){
         return this.peli.search(options.search)
    }else{
         return this.peli.getAll();
      }
    } 

  async add (peli:Peli){
    return this.peli.add(peli)
  }
}
export { PelisController };

/* const pruebas = new PelisController;

(async()=>{
  const getS = await pruebas.add({title:"dasdad", tags:["asdas","as"], id:30})
  console.log(getS)
})(); */