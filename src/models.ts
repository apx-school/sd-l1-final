import jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import { title } from "process";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
  constructor(id: number, title: string, tags: string[]) {
    (this.id = id), (this.title = title), (this.tags = tags);
  }
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  data: Peli[] = [];
  async getAll(): Promise<Peli[]> {
    const pelis = await jsonfile.readFile(__dirname + "/pelis.json");
    // la respuesta de la promesa
    this.data = pelis;
    return pelis;
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaPeliBuscada = await this.getById(peli.id);
    if (promesaPeliBuscada) {
      console.log("Peli ya existe");
      return false;
    } else {
      console.log("Peli agregada");
      this.data.push(peli);
      await jsonfile.writeFile(__dirname + "/pelis.json", this.data);
      return true;
    }
  }

  // Para usar éste método primero se debe usar el método getAll() primero que descarga el archivo json y lo guarda en data
  // { title?: string; tag?: string };
  async getById(id: number): Promise<Peli | null> {
    const lista = await this.getAll();
    const encontrada = lista.find((peli) => {
      return peli.id === id;
    });

    if (!encontrada) {
      console.error("La película buscada no existe");
      return null;
    } else {
      return encontrada;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    // Antes de buscar descargamos los datos y lo ponemos en lista
    const lista = await this.getAll();
    // creamos un nuevo array con la función filter con las peliculas que cumplan las condiciones
    // el filtro guarda la peli que despues de todas las condiciones retorne true
    const listaFiltrada = lista.filter((peli) => {
      //se crea una varible que inicia en false para seleccionar la peli que se agregara al nuevo array filtrado
      let cumpleTag = true; // Asumimos que cumple al principio
      let cumpleTitle = true; // Asumimos que cumple al principio

      //si la propiedad tag existe en options entonces:
      if (options.tag) {
        // Usamos some para verificar si para chequear si al menos un elemento del array incluye
        // lo que hay en options.tag
        cumpleTag = peli.tags.some((tag) => tag.includes(options.tag));
      }
      // Si la propiedad propiedad títle existe entonces:
      if (options.title) {
        // devuelve true o false si el titulo de la peli incluye el string guardado en options.title
        cumpleTitle = peli.title.includes(options.title);
      }

      return cumpleTag && cumpleTitle; // Solo devuelve si cumple ambas condiciones
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli };
