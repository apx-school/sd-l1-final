import * as jsonfile from "jsonfile";
import * as lodash from "lodash";

class ContactsCollectionOptions {
    title?: any | string;
    tag?: any;
  ;
}

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile(__dirname + "/pelis.json").then((resp) => {
      const respuestaRecibida = resp;
      return respuestaRecibida;
    });
  }
  async getById(id: number) {
    return await jsonfile.readFile(__dirname + "/pelis.json").then((resp) => {
      const peliEncontrada = lodash.find(resp, (p) => p.id === id);
      return peliEncontrada;
    });
  }
  async search(options: ContactsCollectionOptions): Promise<Peli[]> {
    const pelis = await jsonfile.readFile(__dirname + "/pelis.json");
    if (
      options.hasOwnProperty("title") &&
      options.hasOwnProperty("tag")
    ) {
      let contadorTitle = 0;
      const pelisTitle = [];
      lodash.filter(pelis, (p) => {
        // console.log(options.title);
        const optMinus = options.title;   //lowerCase
        const evalUno = p.title.toLowerCase().includes(optMinus);
        if (evalUno) {
          return pelisTitle.push(p);
        } else {
          return contadorTitle++;
        }
      });
      // if (contadorTitle === pelis.length) {
      //   // return `El título "${options.title}" no ha sido encontrado`;
      // }
      let contadorTag = 0;
      const pelisTags = [];
      lodash.filter(pelisTitle, (p) => {
        const tagMinu = options.tag;   //lowerCase
        const evvalDos = p.tags.includes(tagMinu);
        if (evvalDos) {
          return pelisTags.push(p);
        } else {
          return contadorTag++;
        }
      });
      // if (contadorTag === pelisTitle.length) {
      //   // return `El tag "${options.tag}" no ha sido encontrado`;
      // } else {
        return pelisTags;
      // }
    } else if (options.hasOwnProperty("title")) {
      //msjs de error????? y GIT
      let contador = 0;
      const pelisEncontradas = [];
      lodash.filter(pelis, (p) => {
        const optionEnMinuscula = options.title;   //lowerCase
        const evaluacion = p.title.toLowerCase().includes(optionEnMinuscula);
        if (evaluacion) {
          return pelisEncontradas.push(p);
        } else {
          return contador++;
        }
      });
      // if (contador === pelis.length) {
      //   // return `El título "${options.title}" no ha sido encontrado`;
      // } else {
        return pelisEncontradas;
      // }
    } else if (options.hasOwnProperty("tag")) {
      let contadorDos = 0;
      const tagsEncontrados = [];
      lodash.filter(pelis, (p) => {
        const tagMinuscula = options.tag;  //lowerCase
        const evaluacionDos = p.tags.includes(tagMinuscula);
        if (evaluacionDos) {
          return tagsEncontrados.push(p);
        } else {
          return contadorDos++;
        }
      });
      // if (contadorDos === pelis.length) {
      //   // return `El tag "${options.tag}" no ha sido encontrado`;
      // } else {
        return tagsEncontrados;
      }
    // } else {
    //   return "Únicos parámetros para el comando 'search' son: 'Title' y 'Tag'";
    // }
  }
  async add(peli: Peli): Promise <boolean> {
    // const pelis = await jsonfile.readFile(__dirname + "/pelis.json");
    const promesaUno = this.getById(peli.id).then((pel) => {
      if (pel) {
        return false;
      } else {
        const pelis = jsonfile.readFileSync(__dirname + "/pelis.json");
        pelis.push(peli)
        // return pelis;
        const promesaDos = jsonfile.writeFile(__dirname + "/pelis.json", pelis);
        return promesaDos.then(()=>{
          return true
        })
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli, ContactsCollectionOptions };


// const pelicoll = new PelisCollection();
// // // console.log(pelicoll.getAll());
// // // pelicoll.getAll().then((resp) => console.log(resp))
// // // pelicoll.getById(2).then((resp) => console.log(resp));
// // // pelicoll.search({ search: { title: "DU" } }).then((resp) => console.log(resp));
// // // console.log(pelicoll.search({search: {title: "an"}}));
// pelicoll.search({title: "he"}).then((res) => console.log(res));
// // pelicoll
//   .add({ id: 20, title: "Jota", tags: ["guapo", "feo"], rating: 20 })
//   .then((resp) => console.log(resp));
