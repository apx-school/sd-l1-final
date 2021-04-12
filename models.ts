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

  getAll(): Promise<Peli[]> {
    const PromesaJSON = jsonfile.readFile("./pelis.json");
    PromesaJSON.then((json) => {
      this.pelisData = json;
    });
    return PromesaJSON;
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((promise) => {
      const peliBuscada = promise.find((peli) => {
        return peli.id == id;
      });
      return peliBuscada;
    });
  }

  search(options: any): Promise<Peli[]> {
    return this.getAll().then((promise) => {
      let tmp = promise
      let aux
 
      if (options.title) {
       aux = tmp.filter((peli) => {return peli.title.toLowerCase().includes(options.title)})
       tmp = aux}
 
 
      if (options.tags) {
       aux = tmp.filter((peli) => {return peli.tags.includes(options.tags)})
       tmp = aux}
 
 
      return tmp
    })}



  add(peli: Peli): Promise<boolean> {
    return this.getAll().then((promise) => {
      let resultado: boolean;
      let peliIds = _.map(promise, "id");

      if (_.includes(peliIds, peli.id)) {
        return (resultado = false);
      }

      if (!_.includes(peliIds, peli.id)) {
        promise.push(peli);
        const writeFilePromise = jsonfile.writeFile("./pelis.json", promise, {
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

/* const test = new PelisCollection();
 */


/* const testPeli = {
  id: 1235,
  title: "peli prueba",
  tags: ["tag prueba 1", "tag prueba 2"],
}; */


/* test.search({title:"wind",tags:"drama"}).then((r) => {
  console.log(r);
}); */
