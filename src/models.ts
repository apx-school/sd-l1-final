import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
 getAll(): Promise<Peli[]> {
  return jsonfile.readFile(__dirname + "/pelis.json").then((pelis: Peli[]) => {
    return pelis;
  }).catch((error) => {
    console.error("Error al leer pelis.json:", error);
    return [];
  });
}


  getById(id: number): Promise<Peli | null> {
    return this.getAll().then((pelis) => {
      const peli = pelis.find((p) => p.id === id);
      return peli || null;
    });
  }

  search(options: SearchOptions): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      let resultado = pelis;
      if (options.title) {
        resultado = resultado.filter((p) =>
          p.title.toLowerCase().includes(options.title.toLowerCase())
        );
      }
      if (options.tag) {
        resultado = resultado.filter((p) =>
          p.tags.includes(options.tag)
        );
      }
      return resultado;
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.getAll()
      .then((pelis) => {
        const existe = pelis.some((p) => p.id === peli.id);
        if (existe) return false;
        pelis.push(peli);
        return jsonfile
          .writeFile(__dirname + "/pelis.json", pelis)
          .then(() => true)
          .catch(() => false);
      })
      .catch(() => false);
  }
}

export { PelisCollection, Peli, SearchOptions };
