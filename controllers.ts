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
    else if (options.search) {
      return this.data.search(options.search);
    }
    else {
      return this.data.getAll();
    }
  }
  add(peli: Peli){
    return this.data.add(peli);
  }
}
export { PelisController };

// function pruebas (){
//   const controlador = new PelisController;
  // console.log(controlador.data)

  // //pruebas de get
  // const opt = {
  //   search: {
  //     title: "i",
  //     tag: "amor"
  //   }
  // }
  // controlador.get(opt).then((c) => console.log(c))

  //pruebas de .add
//   const peli = new Peli;
//   peli.id = 4;
//   peli.title = "La isla"
//   peli.tags = ["accion"];
//   controlador.add(peli).then((p) => console.log(p));


// }


// pruebas();
