import * as jsonfile from "jsonfile";
import * as _ from "lodash";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  arrayPelis: Peli[] = [];
  getAll(): Promise<Peli[]> {
    const todasLasPelis = jsonfile
      .readFile("./pelis.json")
      .then((resultado) => {
        return (this.arrayPelis = resultado);
      });
    return todasLasPelis;
  }
  getById(id: number) {
    return this.getAll().then((peliId) => {
      const peliculaEncontrada = peliId.find((peliculaId) => {
        return peliculaId.id == id;
      });
      return peliculaEncontrada;
    });
  }
  search(options?: any) {
    console.log("estoy entrando aca");
    const parametros = this.getAll().then((p) => {
      if (options.title) {
        console.log(options.title);
        const parametroTitleEncontrado = p.filter((peliEncontrada) => {
          return peliEncontrada.title.includes(options.title);
        });
        console.log(parametroTitleEncontrado);
        return parametroTitleEncontrado;
      }
      return parametros;
    });
    //if (options.title && options.tag) {
    //return this.getAll().then((peliTagYSerch) => {
    //const parametrosEncontrados = peliTagYSerch.filter((peliEncontrada) => {
    //return (
    //peliEncontrada.title.includes(options.title) &&
    //peliEncontrada.tags.includes(options.tag)
    //);
    //});

    //return parametrosEncontrados;
    //});
  } //else if (options.title) {
  //return this.getAll().then((peliTitle) => {
  //const parametroTitleEncontrado = peliTitle.filter((peliEncontrada) => {
  //return peliEncontrada.title.includes(options.title);
  //});
  //return parametroTitleEncontrado;
  //});
  //} else if (options.tag) {
  //console.log("entro aca tambien");
  //return this.getAll().then((peliTag) => {
  //const parametroTagEncontrado = peliTag.filter((peliEncontrada) => {
  //return peliEncontrada.tags.includes(options.tag);
  //});
  //return parametroTagEncontrado;
  //});
  // }
  //}
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.arrayPelis.push(peli);
        const data = this.arrayPelis;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then((peli) => {
          console.log("la pelicula se agrego correctamente");
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };

const peli = new PelisCollection();
peli.search({ title: "T" });
