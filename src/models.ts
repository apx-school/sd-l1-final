import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json").then(() => {
      return jsonfile.readFile("./pelis.json");
    });
  }

  async add(peli: Peli): Promise<boolean> {
    const pelis = await jsonfile.readFile("./pelis.json");
    const peliExistente = pelis.find((p) => p.id === peli.id);
    if (peliExistente) {
      console.log("La peli ya existe");
      return false;
    } else {
      pelis.push(peli);
      await jsonfile.writeFile("./pelis.json", pelis);
      console.log("Peli agregada correctamente");
      return true;
    }
  }

  async getById(id: number): Promise<Peli> {
    const peli = await jsonfile.readFile("./pelis.json");
    const resultado = peli.filter((producto) => producto.id === id);
    return resultado.length > 0 ? resultado[0] : null;
  }
  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const lista = await jsonfile.readFile("./pelis.json");

    const listaFiltrada = lista.filter((p: Peli) => {
      if (options.title && options.tag) {
        const regex = new RegExp(options.tag, "i");
        return (
          p.title.toLowerCase().includes(options.title.toLowerCase()) &&
          p.tags.some((tag) => regex.test(tag))
        );
      } else if (options.title) {
        return p.title.toLowerCase().includes(options.title.toLowerCase());
      } else if (options.tag) {
        const regex = new RegExp(options.tag, "i");
        return p.tags.some((tag) => regex.test(tag));
      } else {
        return true;
      }
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli };
//Instancia de la Clsase PelisCollection metodo getAll
/*const peli = new PelisCollection();
peli.getAll().then((p) => console.log(p));*/

//Instancia de la Clsase PelisCollection metodo add
/*const peliCollection = new PelisCollection();
const nuevaPeli = { id: 5, title: "El Padrino", tags: ["Drama", "Crimen"] };
peliCollection
  .add(nuevaPeli)
  .then(() => {
    console.log("Película agregada correctamente");
  })
  .catch((error) => {
    console.error("Error al agregar la película:", error);
  });*/

//Instancia de la Clsase PelisCollection metodo getById
/*const peliCollection2 = new PelisCollection();
peliCollection2
  .getById(1)
  .then((peli) => {
    console.log(peli);
  })
  .catch((error) => {
    console.error("Error al obtener la peli:", error);
  });

*/

//Instancia de la Clsase PelisCollection metodo search
/*const peli3 = new PelisCollection();
peli3
  .search({ title: "a" })
  .then((p) => console.log("Peliculas encontradas  por titulo: ", p));
console.log("------");
const peli4 = new PelisCollection();
peli4
  .search({ tag: "Drama" })
  .then((p) => console.log(" Peliculas encontradas por tag", p));*/
