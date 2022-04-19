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


const pelisController = new PelisController()
const peli = new Peli
peli.id=19
peli.tags=["hola","ke", "ase"]
peli.title="holakease"

pelisController.add(peli).then(el =>(console.log(pelisController.pelisCollection.getById(19).then(el =>{ console.log(el)}))))

// // console.log("pelis",pelisController)

// const option = {id: 7}
// const option1 = {search: {title:"grand"}}
// const option3 = {}

// const controller = new PelisController()
// const peli = controller.get({ id: 4321865 }).then(el => {console.log(el.id)})
// console.log("peli",peli)

// const k1=pelisController.get(option)
//   .then(el => {
//     console.log("el",el.id)
//     console.log(typeof(el))})


// pelisController.get(option1)
//   .then(el => {console.log( "el1",el)})
// pelisController.get(option3)
//   .then(el => {console.log( "el2",el)})
