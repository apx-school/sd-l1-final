import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis: Peli[]) => {
      //la respuesta de la promesa
      return pelis;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelicula) => {
      const idDePeli = pelicula.find((peli) => peli.id === id);
      return idDePeli;
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", pelis);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
  async search(options: SearchOptions) {
    const lista = await this.getAll();
    const listraFiltrada = lista.filter(function (p) {
      let esteVa = false;
      if (options.tag) {
        // lógica de tags
        // Si options.tag existe, verifica si la película tiene el tag correspondiente
        esteVa = p.tags.includes(options.tag);
        // si pasa cambio "esteVa" a true
      }
      if (options.title) {
        // lógica de title
        // Si options.title existe, verifica si la película tiene el título correspondiente
        esteVa = esteVa || p.title.includes(options.title);
        // si pasa cambio "esteVa" a true
      }
      return esteVa;
    });
    return listraFiltrada;
  }
}
export { PelisCollection, Peli };
