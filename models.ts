import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json")
  };
  async getById(id: number) {
    return await this.getAll().then(res => {
      return res.find(i => i.id == id);
    })
  };
  async search(options: any) {
    if (options.title && options.tag) {
      const filtraTitulo = await this.getAll().then(res => {
        return res.filter(i => i.title.includes(options.title));
      })
      return filtraTitulo.filter(i => {
        if (i.tags.includes(options.tag)) {
            return i
        }
      })
    } else if (options.title) {
      return await this.getAll().then(res => {
        return res.filter(i => i.title.includes(options.title))
      })
    } else if (options.tag) {
      const aux = await this.getAll();
      return await aux.filter(i => {
          if (i.tags.includes(options.tag)) {
            return i
        }
      })
    }
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then(res => {
          res.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", res);
          return promesaDos.then(() => {
            return true;
          });
        })
      }
    });
    return promesaUno;
  }
}
export { PelisCollection, Peli };