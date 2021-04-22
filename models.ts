import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json");
    promesa.then((res) => {
      this.data = res;
    });
    return promesa;
  }

  getById(id: number) {
    return this.getAll().then((res) => {
      return res.find((item) => {
        return item.id == id;
      });
    });
  }

  search(options: any) {
    return this.getAll().then((res) => {
      let listaPelis = res;
      if (options.title && options.tag) {
        listaPelis = res.filter((item) => {
          return item.title.includes(options.title);
        });
        listaPelis = listaPelis.filter((item) => {
          return item.tags.includes(options.tag);
        });
        return listaPelis;
      } else if (options.title) {
        listaPelis = res.filter((item) => {
          return item.title.includes(options.title);
        });
        return listaPelis;
      } else if (options.tag) {
        listaPelis = listaPelis.filter((item) => {
          return item.tags.includes(options.tag);
        });
        return listaPelis;
      }
    });
  }

  add(peli: Peli) {
    return this.getAll().then((res) => {
      const encontrado = res.find((item) => {
        return item.id == peli.id;
      });
      if (encontrado) {
        return false;
      } else {
        this.data.push(peli);
        jsonfile.writeFile("./pelis.json", this.data);
        return true;
      }
    });
  }
}

export { PelisCollection, Peli };
