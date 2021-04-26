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
    promesa.then((pel) => {
      return (this.data = pel);
    });
    return promesa;
  }

  getById(id: number) {
    const promesaPeliId = this.getAll().then(() => {
      return this.data.find((item) => item.id == id);
    });
    return promesaPeliId;
  }

  search(options: any): Promise<any> {
    //console.log(options);
    let promesa = this.getAll().then((pel) => {
      let datos = this.data;

      for (const k in options) {
        if (k == "title") {
          datos = datos.filter((p) => {
            if (p.title.search(options.title) >= 0) return true;
          });
        }
        if (k == "tag") {
          datos = datos.filter((p) => {
            return p.tags.includes(options[k]);
          });
        }
      }
      return datos;
    });
    return promesa;
  }

  add(peli: Peli): Promise<boolean> {
    const cargaDePelis = this.getById(peli.id).then((pel) => {
      if (pel) {
        return false;
      } else {
        const datos = this.data.push(peli);
        const cargaDePeli2 = jsonfile.writeFile("./pelis.json", datos);
        return cargaDePeli2.then(() => {
          return true;
        });
      }
    });
    return cargaDePelis;
  }
}
export { PelisCollection, Peli };
