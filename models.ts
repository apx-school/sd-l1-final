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

  search(options: any) {
    return this.getAll().then((promise) => {
      const resultadoFinal = promise.filter((peli) => {
        let resultado;

        if (peli.title) {
          resultado = peli.title.toLowerCase().includes(options);
        }

        return resultado;
      });
      return resultadoFinal;
    });
  }
}

export { PelisCollection, Peli };

const test = new PelisCollection();

test.search("w").then((r) => {
  console.log(r);
});
