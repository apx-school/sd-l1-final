import { PelisCollection} from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  
  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  async add(movie) {
    return await this.pelisCollection.add(movie);
  }

  async getById(id) {
    return await this.pelisCollection.getById(id);
  }

  async search(options) {
    return await this.pelisCollection.search(options);
  }

  async getAll() {
    return await this.pelisCollection.getAll();
  }
  async  buscarPelicula(objeto) {
    const peliculas = new PelisCollection();
    const todasLasPeliculas = await peliculas.getAll(); // Esperar a que se resuelva la promesa

    if (objeto.id) {
        const idBuscado = objeto.id;
        const peliculaEncontrada = await peliculas.getById(idBuscado);
        return peliculaEncontrada;
    } else if (objeto.search) {
        let peliculasFiltradas = todasLasPeliculas;

        if (objeto.title) {
            const tituloBuscado = objeto.title;
            peliculasFiltradas = peliculasFiltradas.filter(pelicula => pelicula.title.includes(tituloBuscado));
        }

        if (objeto.tag) {
            const tagBuscado = objeto.tag;
            peliculasFiltradas = peliculasFiltradas.filter(pelicula => pelicula.tags.includes(tagBuscado));
        }

        return peliculasFiltradas;
    } else {
        return todasLasPeliculas;
    }
}

  


}





interface Peli {
  id: number;
  titulo: string;
  tags: string[];
}

function crearPelicula(objetoPelicula: any): Peli {
  const { id, titulo, tags } = objetoPelicula;
  return { id, titulo, tags };
}

const objetoPelicula = { id: 1, titulo: "Mi Película", tags: ["acción", "aventura"] };
const nuevaPelicula = crearPelicula(objetoPelicula);
console.log(nuevaPelicula);
export { PelisController };






