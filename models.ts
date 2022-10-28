import * as jsonfile from "jsonfile";
import * as lodash from "lodash";

class ContactsCollectionOptions {
    title?: any | string;
    tag?: any;
  ;
}

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
      const pelisTitle = [];
      lodash.filter(pelis, (p) => {
        const optMinus = options.title; 
        const evalUno = p.title.toLowerCase().includes(optMinus);
        if (evalUno) {
          return pelisTitle.push(p);
        };
      });
      const pelisTags = [];
      lodash.filter(pelisTitle, (p) => {
        const tagMinu = options.tag;
        const evvalDos = p.tags.includes(tagMinu);
        if (evvalDos) {
          return pelisTags.push(p);
        } 
      });
      return pelisTags;
    } else if (options.hasOwnProperty("title")) {
      const pelisEncontradas = [];
      lodash.filter(pelis, (p) => {
        const optionEnMinuscula = options.title; 
        const evaluacion = p.title.toLowerCase().includes(optionEnMinuscula);
        if (evaluacion) {
          return pelisEncontradas.push(p);
        }
      });
      return pelisEncontradas;
    } else if (options.hasOwnProperty("tag")) {
      const tagsEncontrados = [];
      lodash.filter(pelis, (p) => {
        const tagMinuscula = options.tag; 
        const evaluacionDos = p.tags.includes(tagMinuscula);
        if (evaluacionDos){
          return tagsEncontrados.push(p)
        }
      });
      return tagsEncontrados;
      }
  }
  async add(peli: Peli): Promise <boolean> {
    const promesaUno = this.getById(peli.id).then((pel) => {
      if (pel) {
        return false;
      } else {
        const pelis = jsonfile.readFileSync(__dirname + "/pelis.json");
        pelis.push(peli);
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