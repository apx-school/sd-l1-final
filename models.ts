import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  data: Peli[] = [];
  async getAll(): Promise<Peli[]> {
    // Devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas en el archivo JSON.
    const dataPromise = await jsonfile.readFile(__dirname + "/pelis.json");
    this.data = await dataPromise;
    return dataPromise;
  }
  async add(peli: Peli): Promise<boolean> {
    // Recibe una Peli y la guarda en el archivo.
    const primeraPromesa = this.getByID(peli.id).then(async (peliExistente) => {
      if (peliExistente) {
        // No debe admitir agregar IDs repetidos.
        return false;
      } else {
        const peliList = await this.getAll();
        peliList.push(peli);
        const segundaPromesa = jsonfile.writeFile(
          __dirname + "/pelis.json",
          peliList
        );
        return segundaPromesa.then(() => {
          return true;
        });
      }
    });
    // Tiene que devolver un boolean que indique si se agregó correctamente la peli.
    return primeraPromesa;
  }
  async getByID(id: number): Promise<Peli> {
    // Devuelve la peli con el id que se le pase por parámetro.
    const pelis: Peli[] = await jsonfile.readFile(__dirname + "/pelis.json");
    const peliExistente = pelis.find((peliEnIndex) => peliEnIndex.id === id);
    if (peliExistente) {
      return peliExistente;
    }
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    const listraFiltrada = lista.filter(function (peliEnIndex) {
      // filter verboso, posible refactor para legibilidad
      let esteVa = false;
      if (options.tag) {
        // lógica de tags
        peliEnIndex.title.includes(options.tag)
          ? (esteVa = true) // si pasa cambio "esteVa" a true
          : (esteVa = false); // si no pasa, se descarta la peli en interación
      }
      if (options.title) {
        // lógica de title
        peliEnIndex.title.includes(options.title)
          ? (esteVa = true) // si pasa cambio "esteVa" a true
          : (esteVa = false); // si no pasa, se descarta la peli en interación
      }
      return esteVa;
    });

    return listraFiltrada;
  }
}
export { PelisCollection, Peli };
