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
  //agrego un constructor para cargar valores al momento de inicializar
  constructor(id: number, title: string, tags: string[]) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  }
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    //Promise<Peli[] -> es una promesa que devuelve un array de objeto del tipo Peli
    const respuesta = await jsonfile.readFile("./pelis.json");
    return respuesta;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);

    if (peliExistente) {
      return false;
    } else {
      try {
        const data = await jsonfile.readFile("./pelis.json");
        data.push(peli);
        await jsonfile.writeFile("./pelis.json", data);
        return true; // Se agregó correctamente
      } catch (error) {
        console.error("Error al agregar la película:", error);
        return false; // En caso de error, devolvemos false
      }
    }
  }

  async getById(id: number) {
    const resultado = await this.getAll();
    return resultado.find((p) => {
      return p.id === id;
    });
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listraFiltrada = lista.filter(function (p) {
      let esteVa = false;
      if (options.tag) {
        esteVa = p.tags.includes(options.tag);
      }
      if (options.title) {
        esteVa = p.title.includes(options.title);
      }
      return esteVa;
    });

    return listraFiltrada;
  }
}
export { PelisCollection, Peli, SearchOptions };

// Instancias de prueba
const collDePrueba = new PelisCollection();
const peliDePrueba = new Peli(5, "Peli de prueba", ["romantica"]);
const opcionesDePrueba = { title: "prueba", tags: /*["romantica"]*/ [] };

async function probar() {
  // const resultado = await collDePrueba.add(peliDePrueba);
  // console.log("El resultado del agregado fue: ", resultado);
  // const pelis = await collDePrueba.getAll();
  // console.log("Y las peliculas totales ahora son:");
  // console.log(pelis);
  //const resultado = await collDePrueba.search(opcionesDePrueba);
  //console.log(resultado);
}

// Llamar a la función de prueba
probar();
