import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
  }

  async getById(id: number) {
    const todas = await this.getAll();
    return todas.find((peliId) => {
      return peliId.id == id;
    });
  }

  async search(options: any): Promise<any> {
    const todas = await this.getAll();
    if (options.title && options.tag) {
      return todas.filter((peli) => {
        const buscaTitulo = peli.title.includes(options.title);
        const buscaTag = peli.tags.includes(options.tag);
        return buscaTag && buscaTitulo;
      });
    } else if (options.title) {
      return todas.filter((peli) => peli.title.includes(options.title));
    } else if (options.tag) {
      return todas.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
    } else {
      return todas;
    }
  }

  async add(peli: Peli) {
    const tieneId = await this.getById(peli.id);

    if (tieneId) {
      return false;
    } else {
      const todas = await this.getAll();
      todas.push(peli);
      await jsonfile.writeFile("./pelis.json", todas);
      return true;
    }
  }
}
export { PelisCollection, Peli };

// const objeto = new PelisCollection();
// objeto.getAll().then((p) => {
//   console.log(p);
// });
