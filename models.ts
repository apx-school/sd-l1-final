import * as jsonfile from "jsonfile";
import * as _ from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peli: Peli[];
  promise: Promise<any>;

  getAll(): Promise<Peli[]> { 
    this.promise = jsonfile.readFile("./pelis.json").then((obj) =>{
    this.peli = obj;
    return obj;
    })
    return this.promise;
  }
  getById(id:number): Promise<any>{
    return this.promise.then((obj) =>{
      const resultadoId = _.find(obj, ["id", id]);
      return resultadoId
    })
  }

  search(options: any): Promise<any> {
    return this.promise.then((obj) => {
      const filtrado = _.filter(obj, (x) => {
        if (options.tag && options.title) {
          return (
            _.includes(x.tags, options.tag) &&
            x.title.toLowerCase().includes(options.title.toLowerCase())
          );
        }
        if (options.title && !options.tag) {
          return x.title.toLowerCase().includes(options.title.toLowerCase());
        }
        if (!options.title && options.tag) {
          return _.includes(x.tags, options.tag);
        }
      });
      return filtrado;
    });
  }

  add(peli:Peli): Promise<any> {
    return this.getAll().then((obj) => {
      if (!_.find(obj, ["id", peli.id])) {
        obj.push(peli);
        return jsonfile.writeFile("./pelis.json", obj);
      } else {
        return false;
      }
    });
  }
  
}
export { PelisCollection, Peli };
