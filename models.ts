import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];
  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json");
    promesa.then((peliculas) => {
      // la respuesta de la promesa
      this.pelis = peliculas;
    });
    return promesa;
  }

  getById(id: number): Promise<Peli[]> {
    const promesaGetById = this.getAll().then((info) => {
      info.find((i) => {
        return i.id == id;
      });
      return promesaGetById;
    });
    return;
  }
  search(options: any) {
    const promesaSearch = this.getAll().then((i) => {
      i.filter((item) => {
        if (options.title) {
          const tituloMapeado = item.title;
          const tituloFind = tituloMapeado.includes(options.title);
          return tituloFind;
        } else if (options.tag) {
          const tagsMapeados = item.tags;
          const tagsFind = tagsMapeados.includes(options.tag);
          return tagsFind;
        }
      });
      return promesaSearch;
    });
    return;
    /*   const searchByTitle = this.pelis.filter((i) => {
      const itemFiltrado = i.title;
      const titleFiltrado = itemFiltrado.includes(options);
      return titleFiltrado;
    });
    return searchByTitle; */
    /* this.load().then((listaPelis: any) => {
      var listaModificada = listaPelis;
      if (options.title) {
        listaModificada = listaModificada.filter((peli) => {
          return peli.title.includes(options.title);
        });
      }
      if (options.tag) {
        listaModificada = listaModificada.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
        return listaModificada;
      }
    }); */
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = this.getAll().then((res) => {
          return res.push(peli);
        });
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
