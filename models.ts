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
      const r = p.find((p) => {
        return p.id == id;
      });
      return r;
    });
  }

  search(options: any){
    if (options.title && options.tag){
      return this.getAll().then((i) => {
        return i.filter((t) => {
          return t.title.toLowerCase().includes(options.title) && t.tags.includes(options.tag);
        });
      });
    } else if (options.title){
      return this.getAll().then((i) => {
        return i.filter((t) => {
          return t.title.toLowerCase().includes(options.title);
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
    const promesaUno = this.getById(peli.id).then((pExiste) => {
      if (pExiste){
        return false;
      } else {
        const promesaDos = this.getAll().then((d) => {
          d.push(peli);
          return jsonfile.writeFile("./peliculas.json", d);
        });
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }

}
export { PelisCollection, Peli };

