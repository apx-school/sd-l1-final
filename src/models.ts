import * as jsonfile from "jsonfile";
// sumo este import solo para que tsc lo tome y lo copie
// en la app no usamos esto para acceder al archivo porque es dinámico
import "./pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("src/pelis.json").then((data) => {
      return data;
    });
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = await this.getById(peli.id);
    if (promesaUno) {
      return false;
    } else {
      const data = await this.getAll();
      data.push(peli);
      return jsonfile.writeFile("src/pelis.json", data).then(() => {
        return true;
      });
    }
  }

  async getById(id: number): Promise<Peli> {
    const pelicula = await this.getAll();
    const peliculaId = pelicula.find((e) => e.id == id);
    return peliculaId;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listraFiltrada = lista.filter(function (p) {
      let esteVa = false;
      if (options.title && options.tag) {
        esteVa =
          p.title.includes(options.title) && p.tags.includes(options.tag);
      } else if (options.tag && !options.title) {
        esteVa = p.tags.includes(options.tag);
      } else if (options.title && !options.tag) {
        esteVa = p.title.includes(options.title);
      }
      return esteVa;
    });
    return listraFiltrada;
  }
}

//const testt = new PelisCollection();
//console.log(testt.getAll());
//testt.getAll().then((e) => console.log(e)); //WORKS;
//console.log(testt.getById(3).then((e) => console.log(e))); //WORKS
//console.log(testt.add({ id: 6, title: "testing", tags: ["drama"] })); //WORKS
//console.log(testt.search({ title: "La" }).then((e) => console.log(e))); //WORKS;
//console.log(testt.search({ tag: "accion" }).then((e) => console.log(e))); //WORKS
/* console.log(
  testt.search({ title: "La", tag: "accion" }).then((e) => console.log(e))
); */ //WORKS
//ALL MODELS TEST PASS

export { PelisCollection, Peli };
