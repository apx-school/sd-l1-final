import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection;
  }
  get(options){
    if (options.id){
      return this.data.getById(options.id)
    }
    if (options.search.title && options.search.tag) {
      return this.data.search(options.search)
    }
    if (options.search.title){
      return this.data.search(options.search)
    }
    if (options.search.tag){
      return this.data.search(options.search)
    }
    else {
      return this.data.getAll();
    }
  }

  add(peli: Peli){

  }
}
export { PelisController };

function pruebas (){
  const controlador = new PelisController;
  console.log(controlador.data)

  //pruebas de get
  const opt = {
    search: {
      // title: "Titanic",
      // tag: "accion"
    }
  }
  controlador.get(opt).then((p) => console.table(p))

  //pruebas de add


}


pruebas();
