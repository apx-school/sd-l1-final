import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import path from "path";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

class Peli {
  id: number;
  title: string;
  tags: string[];
}
export type SearchOptions = { title?: string; tag?: string };

//no tiene propiedades ni constructor para que pase los test
class PelisCollection {
  async getAll(): Promise<Peli[]> {
    try {
      //cree filePath porque no me corria "./pelis.json"
      const filePath = path.resolve(__dirname, "pelis.json");
      const data = await jsonfile.readFile(filePath);
      return data || [];
    } catch (error) {
      console.log("Error al buscar el archivo ", error);
      return [];
    }
  }

  //busca pelis por id
  async getById(id: number): Promise<Peli | undefined> {
    const peliBuscada = await this.getAll();
    const peliEncontrada = peliBuscada.find((peli) => peli.id === id);
    return peliEncontrada;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    //con esto busca coincidencias si pasas title y tag a la vez.
    //y tambien busca si solo le pasas un fragmento del title o un tag
    const lista = await this.getAll();

    const listraFiltrada = lista.filter((p) => {
      const esTitle = options.title
        ? p.title.toLowerCase().includes(options.title.toLowerCase())
        : true;

      const esTag = options.tag
        ? Array.isArray(p.tags) &&
          p.tags.some((tag) =>
            tag.toLowerCase().includes(options.tag.toLowerCase())
          )
        : true;
      return esTitle && esTag;
    });

    return listraFiltrada;
  }

  //agrega una peli en pelis.json
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    const filePath = path.resolve(__dirname, "pelis.json");

    if (peliExistente) {
      // si la peli existe devuelve false y no se guarda
      return false;
    } else {
      const currentData = await jsonfile.readFile(filePath);
      currentData.push(peli);
      await jsonfile.writeFile(filePath, currentData, { spaces: 1 });
      return true;
    }
  }
}

export { PelisCollection, Peli };
