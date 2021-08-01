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
  add(peli:Peli): Promise<boolean> {
    return this.getById(peli.id).then((p) => {
      if (p) {
        return false;
      } else {
        this.getAll().then((res) => {
          const moviesList = res;
          moviesList.push(peli);
          jsonfile.writeFile("./pelis.json", moviesList).then(() => {
            return true;
          })
          .catch(() => {return false});
        });
      }
    });
  }
}
export { PelisCollection, Peli };