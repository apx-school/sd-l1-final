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
      return pelis;
    });
  }
  getById(id: number) {
    const peliById = this.getAll().then((pelis) => {
      const resultado = pelis.find((p) => {
        return p.id == id;
      });
      return resultado;
    });
    return peliById;
  }
  async search(options: any) {
    const todasLasPelis = await this.getAll();
    if (options.title && options.tag) {
      const respuesta = todasLasPelis.filter((pelis) => {
        return (
          pelis.title.includes(options.title) &&
          pelis.tags.includes(options.tag)
        );
      });
      return respuesta;
    } else if (options.title) {
      const respuesta = todasLasPelis.filter((pelis) => {
        return pelis.title.includes(options.title);
      });
      return respuesta;
    } else if (options.tag) {
      const respuesta = todasLasPelis.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
      return respuesta;
    }
  }
  async add(peli: Peli) {
    if (await this.getById(peli.id)) {
      return false;
    } else {
      const peliculas = await this.getAll();
      peliculas.push(peli);
      await jsonfile.writeFile("./pelis.json", peliculas);
      return true;
    }
  }
}

//mock (prueba de métodos del models)
// const objeto = new PelisCollection();
// objeto.getById(3).then((p) => {
//   console.log(p);
// });
// objeto.search({ title: "VOLver" });
// objeto.search({ tag: "InformatiCa" });
// objeto.search({ tag: "romance"}).then((peli)=>{
//   console.log(peli)
// })
// const peliNueva = {
//   id: 100,
//   title: "pelicula nueva",
//   tags: ["accion", "romance", "epica"],
// };
// objeto.add(peliNueva).then((peli) => {
//   console.log(peli);
// });
export { PelisCollection, Peli };
