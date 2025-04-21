import jsonfile from "jsonfile";
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
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("src/pelis.json");
  };

  getById(id: number): Promise<Peli> {
    return this.getAll().then((lista) => {
      const peli = lista.find((peli) => {
        return peli.id === id;
      });
      return peli;
    });
  };

  async add(peli: Peli): Promise<boolean> {
    const peliculaYaExiste = await this.getById(peli.id);
    const listaPelis = await this.getAll();
    if (!peliculaYaExiste) {
      listaPelis.push(peli);
      await jsonfile.writeFile("src/pelis.json", listaPelis);
    } else return false;

  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    const listaFiltrada = lista.filter((p) => {
      let peliAceptada = false;
      if (options.tag) {
        const tagOptions = options.tag.trim().toLowerCase();
        peliAceptada = p.tags.some((tag) => tag.trim().toLowerCase().includes(tagOptions));
      }
      if (options.title) {
        const titleOptions = options.title.trim().toLowerCase();
        if (p.title.trim().toLowerCase().includes(titleOptions)) {
          peliAceptada = true;
        }
      }
      return peliAceptada;
    });
    return listaFiltrada;
  }
}
type SearchOptions = { title?: string; tag?: string };

async function main() {
  const a = new PelisCollection();
  const peli = await a.search({ tag: "a" })
  console.log(peli);

}

main();
export { PelisCollection, Peli };
