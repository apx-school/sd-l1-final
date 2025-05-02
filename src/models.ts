
import * as jsonfile from "jsonfile";
import * as lodash from 'lodash'



class Peli {
  id: number;
  title: string;
  tags: string[];
}

export type SearchOptions = {
  title?: string;
  tags?: string[] // Cambiado a array de strings
};


class PelisCollection {

  getAll = async (): Promise<Peli[]> => {
    const datosJson = await jsonfile.readFile(__dirname + '/pelis.json');
    return datosJson
  }

  add = async (pelicula: Peli): Promise<boolean> => {
    const cargarDatos = await jsonfile.readFile(__dirname + '/pelis.json');
    console.log(cargarDatos)
    const datosRepetidos = lodash.some(cargarDatos, (x) => x.id === pelicula.id)
    console.log(datosRepetidos);

    if (datosRepetidos === false) {
      const pelisCargadas = await this.getAll()
      pelisCargadas.push(pelicula);
      await jsonfile.writeFile(__dirname + '/pelis.json', pelisCargadas)
      return true

    } else {
      console.log(`La pelicula ${pelicula} ya se encuentra registrada`);
      return false
    }
  }

  getByID = async (id: number): Promise<Peli> => {
    const buscarPelis = await this.getAll();
    const peliEncontrada = lodash.find(buscarPelis, x => x.id === id)
    return peliEncontrada
  }

  search = async (options: SearchOptions): Promise<Peli[]> => {
    const todasPeliculas = await this.getAll();
    let resultado = todasPeliculas;

    // Filtrar por título si se proporciona
    if (typeof options.title === "string") {
      resultado = lodash.filter(resultado, peli =>
        lodash.includes(lodash.lowerCase(peli.title), lodash.lowerCase(options.title))
      );
    }

    // Filtrar por tags si se proporcionan
    if (Array.isArray(options.tags) && options.tags.length > 0) {
      // Convertir los tags de búsqueda a minúsculas una sola vez
      const searchTagsLower = options.tags.map(tag => lodash.lowerCase(tag));

      resultado = lodash.filter(resultado, peli => {
        // Convertir los tags de la película a minúsculas
        const peliTagsLower = peli.tags.map(tag => lodash.lowerCase(tag));
        // Verificar si hay alguna intersección entre los tags de búsqueda y los tags de la película
        return lodash.intersection(searchTagsLower, peliTagsLower).length > 0;
      });
    }

    // Si no se proporcionó ni título ni tags válidos, devolver todas las películas (ya que resultado = todasPeliculas inicialmente)
    // Opcionalmente, podrías querer devolver un array vacío si no se especifican criterios.
    // Por ahora, si no hay criterios, devuelve todo.

    return resultado;
  }


}

export { PelisCollection, Peli };
