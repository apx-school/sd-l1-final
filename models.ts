import * as jsonfile from "jsonfile";
import * as concat from "lodash/concat"

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = [];
  
  getAll(): Promise<Peli[]> {
    return jsonfile("./pelis.json").then((json) => {
      // la respuesta de la promesa
      this.peliculas = json;
      return this.peliculas;
    });
  }
  getById(id: number): Peli {
    return this.peliculas.find((p) => {
      return p.id == id;
    });
  }
  search(options: any): Peli {
    if(Object.keys.(options).includes("title")){
      return this.peliculas.find((p)=>{
        return p.title == options
      })
    }
  }
  add(peli: Peli) {
    let flag: Boolean;
    if (this.peliculas.includes(peli)) {
      flag = false;
    } else {
      this.peliculas = concat(this.peliculas, peli);
      this.peliculas = jsonfile.writeFile("./pelis.json", this.peliculas);
      flag = true;
    }
    return flag;
  }
}
export { PelisCollection, Peli };
