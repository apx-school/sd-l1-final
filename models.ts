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

  search(options: any) {
    return this.getAll().then((json) => {
      let peliculas = json;

      if (options.title) {
        peliculas = peliculas.filter((pelicula) => {
          return pelicula.title.includes(options.title);
        });
      }
      if (options.tag) {
        peliculas = peliculas.filter((pelicula) => {
          return pelicula.tags.includes(options.tag);
        });
      }
      return peliculas;
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
