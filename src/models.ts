import * as jsonfile from "jsonfile";

type Peli = {
  id: number;
  title: string;
  tags: string[];
};

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  // Obtener todas las películas
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./src/pelis.json").then((data: Peli[]) => {
      return data;
    });
  }

  // Obtener una película por ID
  async getById(id: number): Promise<Peli | null> {
    try {
      const pelis = await this.getAll();
      return pelis.find((peli) => peli.id === id) || null;
    } catch (error) {
      console.error("Error al obtener la película por ID:", error);
      return null;
    }
  }

  // Agregar una nueva película
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        console.log("Error: Ya existe una película con el ID", peli.id);
        return false;
      } else {
        return this.getAll().then((pelis) => {
          const data = [...pelis, peli];
          return jsonfile.writeFile("./src/pelis.json", data).
          then(() => true)
          .catch(() => false)
        });
      }
    }).catch(() => false);     
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p) => {
      let esteVa = false;

      if (options.tag && p.tags.includes(options.tag)) {
        esteVa = true;
      }

      if (options.title && p.title.includes(options.title)) {
        esteVa = true;
      }

      if (options.tag && options.title) {
        esteVa = p.tags.includes(options.tag) && p.title.includes(options.title);
      }

      return esteVa;
    });


    return listaFiltrada;
  }


}
export { PelisCollection, Peli };