import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((p) => {
      // la respuesta de la promesa
      return p;
    });
  }

  getById(id: number) {
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((p) => {
        return p.id == id;
      });
      return resultado;
    });
  }
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data

        return this.getAll().then((data) => {
          data.push(peli);

          const promesaDos = jsonfile.writeFile("./pelis.json", data);

          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
  }
  async search(options) {
    const lista = await this.getAll();

    const listraFiltrada = lista.filter(function (p) {
      let esteVa = false;

      if (options.tag && options.title) {
        return p.tags.includes(options.tag) && p.title.includes(options.title);
      }
      if (p.tags.includes(options.tag)) {
        esteVa = true;
        // lógica de tags
        // si pasa cambio "esteVa" a true
      }
      if (p.title.includes(options.title)) {
        esteVa = true;
        // lógica de title
        // si pasa cambio "esteVa" a true
      }
      return esteVa;
    });
    return listraFiltrada;
  }
}
export { Peli, PelisCollection };
