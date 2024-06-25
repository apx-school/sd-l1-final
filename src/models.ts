import * as jsonfile from "jsonfile";
// sumo este import solo para que tsc lo tome y lo copie
// en la app no usamos esto para acceder al archivo porque es dinámico
import "C:/Users/alami/Desktop/Proyectos/Modulo 1/Buscador de peliculas orientado a objetos/sd-l1-final/src/pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: any;
  tags: any[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const pelis = await jsonfile.readFile("C:/Users/alami/Desktop/Proyectos/Modulo 1/Buscador de peliculas orientado a objetos/sd-l1-final/src/pelis.json");
    return pelis;
    };
    async getById(id: number): Promise<Peli> {
      try {
          const pelis = await jsonfile.readFile("C:/Users/alami/Desktop/Proyectos/Modulo 1/Buscador de peliculas orientado a objetos/sd-l1-final/src/pelis.json");
          const foundPeli = pelis.find((peli) => peli.id === id);
          
          if (!foundPeli) {
              throw new Error("No se encontró la película");
          }
          
          return foundPeli;
      } catch (error) {
          console.log("Error al leer el archivo:", error);
          throw error;
      }
  }
  
  
  
async add(peli: Peli): Promise<boolean> {
  const pelis = await jsonfile.readFile("C:/Users/alami/Desktop/Proyectos/Modulo 1/Buscador de peliculas orientado a objetos/sd-l1-final/src/pelis.json");
    const peliculaExistente = pelis.find((p) => p.id === peli.id);
  if (peliculaExistente) {
    return false; 
  }
  pelis.push(peli);
  await jsonfile.writeFile("C:/Users/alami/Desktop/Proyectos/Modulo 1/Buscador de peliculas orientado a objetos/sd-l1-final/src/pelis.json", pelis);
  return true;
}

async search(options) {
  const lista = await this.getAll();
  const listaFiltrada = lista.filter(function (p) {
    let esteVa = true; 
    if (options.tags && !p.tags.includes(options.tags)) {
      esteVa = false; 
    }
    if (options.title && !p.title.toLowerCase().includes(options.title.toLowerCase())) {
      esteVa = false; 
    }
    return esteVa;
  });
  return listaFiltrada;
}
}
// async function obtenerPeliculas() {
//   const pelisCollection = new PelisCollection();
//   const peliculas = await pelisCollection.getById(4);
//   console.log(peliculas);
// }

// obtenerPeliculas();


export { PelisCollection, Peli };
