// jsonfile no incluye declaracion es de tipos.
// @ts-expect-error El paquete se usa correctamente en tiempo de ejecución.
import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";

type SearchOptions = {
  tag?: string;
  title?: string;
};

class Peli {
  id!: number;
  title!: string;
  tags!: string[];
}

class PelisCollection {
  getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((pelis) => pelis.find((peli) => peli.id === id));
  }

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis).then(() => true);
        });
      }
    });
  }

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis: Peli[]) => {
      // la respuesta de la promesa
      return pelis;
    });
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((peli) => {
      let esteVa = false;

      if (options.tag) {
        esteVa = peli.tags.includes(options.tag);
        // lógica tag
      }

      if (options.title) {
        esteVa = peli.title.includes(options.title);
        // lógica title
      }

      return esteVa;
    });

    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
