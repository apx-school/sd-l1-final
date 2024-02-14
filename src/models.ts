import * as jsonfile from "jsonfile";
// sumo este import solo para que tsc lo tome y lo copie
// en la app no usamos esto para acceder al archivo porque es dinámico
import "./pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  //devuelve todas las pelis del JSON
  async getAll(): Promise<Peli[]> {
    const pelisJson = await jsonfile.readFile("./pelis.json");
    return pelisJson;
  }

  //devuelve las pelis del JSON cuyo id sea igual al que le paso como parámetro
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    const peliById = pelis.find((peli) => peli.id == id);
    return peliById;
  }

  //si peli no está en el JSON, la agrega
  async add(peli: Peli): Promise<boolean> {
    const peliById = await this.getById(peli.id);

    if (peliById) {
      return false;
    } else {
      const pelisJson = await this.getAll();
      pelisJson.push(peli);
      return jsonfile.writeFile("./pelis.json", pelisJson).then(() => {
        return true;
      });
    }
  }

  //filtra las pelis del JSON por título o tags
  async search(options): Promise<Peli[]> {
    const pelisJson = await this.getAll();

    if (options.title) {
      const peliByTitle = pelisJson.filter((peli) =>
        peli.title.includes(options.title)
      );
      return peliByTitle;
    } else if (options.tag) {
      const peliByTag = pelisJson.filter((peli) =>
        peli.tags.includes(options.tag[0].toUpperCase() + options.tag.slice(1))
      );
      return peliByTag;
    }
  }
}

export { PelisCollection, Peli };
