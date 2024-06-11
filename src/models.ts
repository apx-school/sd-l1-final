import * as jsonfile from 'jsonfile';
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
  async getAll(): Promise<Peli[]> {
    try {
      const res = await jsonfile.readFile("./pelis.json");
      const peliculas: Peli[] = res.map((peli: any) => {
        return {
          id: peli.id,
          titulo: peli.titulo,
          tags: peli.tags
        };
      });
      return peliculas;
    } catch (error) {
      console.error('Error al leer el archivo pelis.json:', error);
      return [];
    }

  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const data: Peli[] = await jsonfile.readFile("./pelis.json");

      const idExistente = data.some((p) => p.id === peli.id);
      if (idExistente) {
        return false; // Devuelve false si el ID ya existe
      }

      data.push(peli);

      await jsonfile.writeFile("./pelis.json", data);
      return true; // Devuelve true si se agregó correctamente la película
    } catch (error) {
      console.error('Error al agregar la película:', error);
      return false; // Devuelve false si hubo un error al guardar la película
    }
  }
  async getById(id: number): Promise<Peli> {
    try {
        const peliculas = await this.getAll();
        const pelicula = peliculas.find((p) => p.id === id);
        if (pelicula) {
            return pelicula;
        } else {
            throw new Error('Película no encontrada');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error al buscar la película por ID');
    }
}
 

async search (options) {
  const lista = await this.getAll();

  const listaFiltrada = lista.filter(function (p) {
    let esteVa = false;
    if (options.tag && p.tags.includes(options.tag)) {
      esteVa = true;
    }
    if (options.title && p.title.includes(options.title)) {
      esteVa = true;
    }
    return esteVa;
  });

  return listaFiltrada;
}


}




export { PelisCollection, Peli };