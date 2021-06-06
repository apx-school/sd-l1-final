import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((listaPelis) => {
      return listaPelis;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((listaPelis) => {
      return listaPelis.find((item) => {
        return item.id == id;
      });
    });
  }
  search(options: any): Promise<Peli[]> {
    return this.getAll().then((listaPelis) => {
      if (options.title && options.tag){
        return listaPelis.filter((item)=>{
          return item.title.includes(options.title) && item.tags.includes(options.tag);
        });
      }
      if (options.title) {
        return listaPelis.filter((item) => {
          return item.title.includes(options.title);
        });
      }
      if (options.tag) {
        return listaPelis.filter((item) => {
          return item.tags.includes(options.tag);
        });
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((respuesta) => {
      if (respuesta) {
        return false;
      } else {
        return this.getAll().then((lista) => {
          lista.push(peli);
          return jsonfile.writeFile("./pelis.json", lista).then(() => {
            return true;
          });
        });
      }
    });
  }
}
export { PelisCollection, Peli };
