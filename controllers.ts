import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection
  // promise: Promise<any>;
  constructor() {
    this.pelisCollection = new PelisCollection();
    // const promise = this.pelisCollection.getAll()
    // this.promise = promise
  }
  async get(options?): Promise<any> {
    if (options.id) {
      // console.log("vas por aqui2")
      return await this.pelisCollection.getById(options.id)}
    if (options.search) {
      // console.log("vas por aqui3")
      return await this.pelisCollection.search(options.search)
    } else {
      // console.log("vas por aqui4")
      return await this.pelisCollection.getAll();
    }
  }
  async add(peli: Peli) {
    return await this.pelisCollection.add(peli);
  }
}
export { PelisController };

// (async()=>{
// const options= {title:"hola",id:7}
// const pelisController = new PelisController()
// const promesa = await pelisController.get(options)
  
// console.log("promesa",promesa)})()

