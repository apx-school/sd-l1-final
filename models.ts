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
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
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

  search(options: any) {
    var resultado;
    if (options.title) {
      // si el objeto tiene la propiedad title,
      // el método tiene que devolver todas las películas que tengan ese string en su title.

      const encontrada = this.getAll().then((pelis) => {
        pelis.filter((p) => {
          return p.title.includes(options.title);
        });
      });
      return encontrada;
    } else if (options.tags) {
      const encontrada = this.getAll().then((pelis) => {
        const resultado = pelis.filter((p) => {
          return p.tags == options.tags;
        });
        return encontrada;
      });
    }
    return resultado
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = jsonfile.readFileSync("./pelis.json");
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
