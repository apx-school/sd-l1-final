import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json")
    .then((pelis) => { return pelis; });
  }

  getById(id:number){
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((p) => {
        return p.id == id;
      });
      return resultado;
    });
  }

  search(options: any): Promise<any>{
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((p) => {
          return (p.title.includes(options.title) && 
            p.tags.includes(options.tag) );
        });
      } else if (options.title) {
        return pelis.filter((p) => {
          return p.title.includes(options.title);
        });
      } else if (options.tag) {
          return pelis.filter((p) => {
            return p.tags.includes(options.tag);
          });
      }
    });
  }

  add(peli:Peli): Promise<boolean> {
    const resultado = this.getById(peli.id).then((pelicula) => {
      if (pelicula) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          const data = pelis;
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", data)
          .then(() => { return true; });
        });
      }
    });
    return resultado;
  }
}
export { PelisCollection, Peli };
