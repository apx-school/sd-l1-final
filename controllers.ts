import { PelisCollection, Peli } from "./models";

class PelisController {
  constructor() {
    this.modelo = new PelisCollection();
  }
  modelo: PelisCollection;

  get(options){
    if(options.id){
      return this.modelo.getById(options.id);
    } else if(options.search){
      return this.modelo.search(options.search);
    } else{
      return this.modelo.getAll();
    }
  }
  add(peli:Peli){
    return this.modelo.add(peli);
  }
}

export { PelisController };

// const prueba = new PelisController();

//PRUEBA GET(ID)

// prueba.get({"id": 5}).then((prueba) => {
//   console.log(prueba)
// })

//PRUEBA GET(SEARCH)

// prueba.get({"search": {"title" : "El"}}).then((prueba)=> {
//   console.log(prueba)
// })

//PRUEBA GET(VACIO)

// prueba.get({}).then((prueba)=> {
//   console.log(prueba)
// })

//PRUEBA GET(ADD)

// prueba.add({
//   id: 6,
//   title: 'El Hocker',
//   tags: [ 'Drama', 'Acción', 'Fantasía' ]
// }).then((add) => {
//   console.log(add)
// })

