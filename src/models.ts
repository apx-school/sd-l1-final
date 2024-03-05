import * as jsonfile from "jsonfile"
import "./pelis.json"

// Defino las opciones de búsqueda
type SearchOptions = { title?: string; tag?: string }

// Clase que representa una película
class Peli {
  id: number
  title: string
  tags: string[]
}

// Clase que representa una colección de películas
class PelisCollection {
  pelis: Peli[] = []

// Método para obtener todas las películas
getAll(): Promise<Peli[]> {
  return new Promise((resolve, reject) => {
    jsonfile.readFile("./src/pelis.json").then(
      (peliculasJSON) => {
        try {
          resolve(peliculasJSON);
        } catch (error) {
          console.error("Error al leer el archivo");
          reject(error);
        }
      },
      (error) => {
        console.error("Error al leer el archivo");
        reject(error);
      }
    );
  });
}


  // Método para obtener una película por su ID
  getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((peliculas) => {
      return peliculas.find((peli) => peli.id === id)
    })
  }

  // Método para agregar una nueva película
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id)
    if (peliExistente) {
      return false
    } else {
      const peliculas = await this.getAll()
      peliculas.push(peli)
      await jsonfile.writeFile("./src/pelis.json", peliculas)
      return true
    }
  }

  // Método para buscar películas según las opciones proporcionadas
  // Método para buscar películas según las opciones proporcionadas
async search(options: SearchOptions): Promise<Peli[]> {
  const lista = await this.getAll();
  
  // Filtrar la lista de películas según las opciones
  const listaFiltrada = lista.filter((p) => {
    let esteVa = true;
    
    // Filtrar por tag si se proporciona en las opciones
    if (options.tag && !p.tags.some(tag => tag.toLowerCase() === options.tag.toLowerCase())) {
      esteVa = false;
    }
    
    // Filtrar por título si se proporciona en las opciones
    if (options.title && !p.title.toLowerCase().includes(options.title.toLowerCase())) {
      esteVa = false;
    }
    
    return esteVa;
  });  
  return listaFiltrada;
}

}

export { PelisCollection, Peli }
