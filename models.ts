import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./peliculas.json").then((p) => {
      return p;
    });
  }

  getById(id: number){
    return this.getAll().then((p) => {
      const r = p.filter((p) => {
        return p.id == id;
      });
      return r;
    });
  }

  search(options: any){
    if (options.title && options.tag){
      return this.getAll().then((i) => {
        return i.filter((t) => {
          return t.title.includes(options.title.toUpperCase()) && t.tags.includes(options.tag);
        });
      });
    } else if (options.title){
      return this.getAll().then((i) => {
        return i.filter((t) => {
          return t.title.includes(options.title.toUpperCase());
        });
      });
    } else if (options.tag){
      return this.getAll().then((i) => {
        return i.filter((t) => {
          return t.tags.includes(options.tag);
        });
      });
    }
  }

  add(peli: Peli): Promise<boolean> {
    console.log('Ok ADD')
    const promesaUno = this.getById(peli.id).then((pExiste) => {
      if (pExiste){
        console.log('Ok ID REPETIDO')
        return false;
      } else {
        const promesaDos = this.getAll().then((d) => {
          d.push(peli);
          return jsonfile.writeFile("./peliculas.json", d);
        });
        return promesaDos.then(() => {
          console.log('Ok AGREGANDO PELICULA')
          return true;
        });
      }
    });
    console.log('Ok END')
    return promesaUno;
  }

}
export { PelisCollection, Peli };

