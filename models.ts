import * as jsonfile from "jsonfile";
import * as _ from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelisData: Peli[];

  getAll(): Promise<any> {
    const PromesaJSON = jsonfile.readFile("./pelis.json");
    PromesaJSON.then((json) => {
      this.pelisData = json;
    });
    return PromesaJSON;
  }

  getById(id: number): Promise<any> {
    return this.getAll().then((promise) => {
      const peliBuscada = promise.find((peli) => {
        return peli.id == id;
      });
      return peliBuscada;
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then((result) => {
      let tmp = result

      if (options.title) {
         tmp = tmp.filter((peli) => {
         let peliTitle = peli.title.toLowerCase()
         let searchTitle = options.title
         return peliTitle.includes(searchTitle)
        })}
 
      if (options.tags) {
         tmp = tmp.filter((peli) => {
         let peliTags = peli.tags
         let searchTags = options.tags
         return peliTags.includes(searchTags)
        })} else

      if (options.tag) {
        tmp = tmp.filter((peli) => {
        let peliTags = peli.tags
        let searchTags = options.tag  
        return peliTags.includes(searchTags)
        })}

      return tmp
    })}


  
  add(peli: Peli): Promise<any> {
    return this.getById(peli.id).then((peliData) => {
      let resultado: boolean;
      let peliFiltered = peliData;

      if (_.includes(peliFiltered, peli.id)) {
        return (resultado = false);
      }

      if (!_.includes(peliFiltered, peli.id)) {
        this.pelisData.push(peli);
        const writeFilePromise = jsonfile.writeFile("./pelis.json", this.pelisData, {
          spaces: 1,
        });

        if (writeFilePromise.then()) {
          return (resultado = true);
        }

        if (writeFilePromise.catch()) {
          return (resultado = false);
        }
      }
    });
  }
}

export { PelisCollection, Peli };
