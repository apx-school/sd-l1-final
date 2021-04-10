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
        return (peli.id = id);
      });
      return peliBuscada;
    });
  }

  search(options: any): Promise<Peli[]> {
    return this.getAll().then((promise) => {
      const resultadoFinal = promise.filter((peli) => {
        let optionsAsId = peli.title.toLowerCase().includes(options);
        let optionsAsTag = peli.tags.includes(options);
        let resultado;

        if (optionsAsId) {
          resultado = optionsAsId;
        }
        if (optionsAsTag) {
          resultado = optionsAsTag;
        }
        return resultado;
      });
      return resultadoFinal;
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.getAll().then((promise) => {
      let resultado: boolean;
      let peliIds = _.map(promise, "id");

      if (_.includes(peliIds, peli.id)) {
        return (resultado = false);
      }

      if (!_.includes(peliIds, peli.id)) {
        promise.push(peli);
        jsonfile.writeFile("./pelis.json", promise);
        return (resultado = true);
      }
    });
  }
}

export { PelisCollection, Peli };

//const test = new PelisCollection();

/* const testPeli = {
  id: 111,
  title: "peli prueba",
  tags: ["tag prueba 1", "tag prueba 2"],
};

test.add(testPeli).then((r) => {
  console.log(r);
});
 */
