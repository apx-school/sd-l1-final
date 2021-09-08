import { PelisCollection, Peli } from "./models";

class PelisController {

    pelis: PelisCollection;
    constructor() {
      this.pelis = new PelisCollection();
    }
    get(options) {
      
      if (options.id) {
        return this.pelis.getById(options.id).then((peliPorId) => {
          return peliPorId;
        });

      } else if (options.search) {
        return this.pelis.search(options.search).then((pelisBuscadas) => {
          return pelisBuscadas;
        });

      } else {
        return this.pelis.getAll().then((todasLasPelis) => {
          return todasLasPelis;
        });
      }
    }
    add(peli: Peli) {
        return this.pelis.add(peli);
    }
}


// const objeto = new PelisController();
// objeto.add({"id": 12, "title": "Guardianes de la galaxia", "tags": ["comedia"]}).then((resultado) => {
//     console.log(resultado);
// })
// objeto.get({ id: 10 }).then((resultado) => {
//   console.log(resultado);
// })
// objeto.get({ search:{ tags:"romance", title:"land"}}).then((resultado) => {
//   console.log(resultado);
// })
// objeto.get({ search:{ tags:"animación"}}).then((resultado) => {
//   console.log(resultado);
// })
// objeto.get({ search:{ title: 'and'}}).then((resultado) => {
//   console.log(resultado);
// })
// objeto.get({ search:{ title:"unica"}}).then((resultado) => {
//   console.log(resultado);
// })
// objeto.get({}).then((resultado) => {
//   console.log(resultado);
// })

export { PelisController };