import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((res) => {
      return res;
    });
  }
  getById(id:number): Promise<Peli> {
    return this.getAll().then((res) => {
      return res.find(p => p.id == id);
    });
  }
  search(options:any): Promise<Peli[]> {
    return this.getAll().then((res) => {
      var result = res;
      if (options.title) {
        result = result.filter(p => p.title.includes(options.title));
      } 
      if (options.tag) {
        result = result.filter(p => p.tags.includes(options.tag));
      }
      return result;
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then((res) => {
          res.push(peli);
          return jsonfile.writeFile("./pelis.json", res);
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