import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  //getAll lee y retorna lo que esta en el archivo JSON
  async getAll(): Promise<Peli[]> {
    const promesa = await jsonfile.readFile("./pelis.json").then((data) => {
      return data;
    });

    // la respuesta de la promesa -- Estoy usando async y Await, se resuelve la promesa y se retorna
    return promesa;
  }

  //Método de búsqueda de pelis por ID
  async getById(id: number) {
    const todasLasPelis = await this.getAll();

    const encontrado = todasLasPelis.find((pelis) => {
      return pelis.id == id;
    });
    return encontrado;
  }

  //Método de busqueda de pelis, por titulo, tag o ambos al mismo tiempo
  async search(options: any) {
    const todasLasPelis = await this.getAll();
    //opcion de búsqueda por titulo y tag
    if (options.title && options.tag) {
      const filtredByTag = todasLasPelis.filter((pelis) => {
        return (
          pelis.title.includes(options.title) &&
          pelis.tags.includes(options.tag)
        );
      });
      return filtredByTag;
    }
    //opción de búsqueda por título
    else if (options.title) {
      const filtradoPorTitulo = todasLasPelis.filter((pelis) => {
        return pelis.title.includes(options.title);
      });
      return filtradoPorTitulo;
      //opción de búsqueda por tag
    } else if (options.tag) {
      const filtradoPorTag = todasLasPelis.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
      return filtradoPorTag;
      //Ante cualquier inconveniente se retorna getAll()
    } else {
      return this.getAll();
    }
  }
  async add(peli: Peli) {
    //Este método añade películas al archivo JSON, en caso de repetirse un ID, retorna un mensaje - el objeto que quisiste añadir - y no cambia ni añade nada al archivo JSON

    const todasLasPelis = await this.getAll();
    const peliNueva = peli;
    const existeUnaPeliConElId = await this.getById(peli.id).then((p) => p); //Si no llegase a existir una peli con el ID indicado. Se añade, en caso contrario retorna el mensaje después del if

    if (existeUnaPeliConElId) {
      return [peli, "ya existe y por ende no puede ser añadido"];
    } else {
      todasLasPelis.push(peliNueva);
      const promesa = await jsonfile
        .writeFile("./pelis.json", todasLasPelis)
        .then(() => {
          return peli;
        });
      return promesa;
    }

    //Al finalizar se reescribe el archivo json, y se le agrega la peliNueva
  }
}

export { PelisCollection, Peli };
