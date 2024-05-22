import * as jsonfile from "jsonfile";

import "./pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

interface SearchOptions {
  title?:  string;
  tags?: string[];
}

class PelisCollection {
  async getAll() {
    const json = await jsonfile.readFile("pelis.json");
    return json;
  }

  async getById(id:number){
    const pelicula = await this.getAll();
    const resultado = pelicula.find((peli) => peli.id == id);
    return resultado;
  }

  async search(options:SearchOptions): Promise<Peli[]>{
    const {tags , title} = options;
    const peliculas = await this.getAll();
    if(tags && title){
      return peliculas.filter((peli) => peli.title.includes(title) && tags.every((tag) => peli.tags.includes(tag)));
    } else if(tags){
      return peliculas.filter((peli) => tags.every((tag) => peli.tags.includes(tag)));
    } else if(title){
      return peliculas.filter((peli) => peli.title.includes(title));
    } else {
      return peliculas;
    }
  }

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
            return false;
        } else {
            return jsonfile.readFile("./pelis.json").then((data: Peli[]) => {
                data.push(peli);
                return jsonfile.writeFile("./pelis.json", data).then(() => {
                    return true;
                }).catch((error) => {
                    console.error("Error al escribir en el archivo pelis.json:", error);
                    return false;
                });
            }).catch((error) => {
                console.error("Error al leer el archivo pelis.json:", error);
                return false;
            });
        }
    }).catch((error) => {
        console.error("Error al obtener la película por ID:", error);
        return false;
    });
  }

}
export { PelisCollection, Peli, SearchOptions };
