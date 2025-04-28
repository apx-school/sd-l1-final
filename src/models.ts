
import * as jsonfile from "jsonfile";
import * as lodash from 'lodash'



class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = {
  title?: string;
  tag?: string
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
    /// vamos a hacerlo con tre optiones , si hay title, si hay tag o si hay ambos , pero tando priodidad a que se filtre el tag de el titulo filtrado
    if (typeof options.title === "string" && typeof options.tag === "undefined") {
      const titulo = lodash.filter(todasPeliculas, objeto =>
        lodash.includes(lodash.lowerCase(objeto.title), lodash.lowerCase(options.title))
      )
      return titulo
    }

    if (typeof options.tag === "string" && typeof options.title === "undefined") {
      const tagsPeli = lodash.filter(todasPeliculas, objeto =>
        lodash.includes(lodash.lowerCase(objeto.tags), lodash.lowerCase(options.tag))
      )
      return tagsPeli
    }

    if (typeof options.tag === "string" && typeof options.title === "string") {
      const titulos = lodash.filter(todasPeliculas, objeto =>
        lodash.includes(lodash.lowerCase(objeto.title), lodash.lowerCase(options.title))
      )

      const tagsPeli = lodash.filter(titulos, objeto =>
        lodash.includes(lodash.lowerCase(objeto.tags), lodash.lowerCase(options.tag))
      )

      return tagsPeli
    }
  }


}

export { PelisCollection, Peli };

