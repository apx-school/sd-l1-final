import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    try {
      const data: Peli[] = await jsonfile.readFile("./pelis.json");
      return data;
    } catch (error) {
      console.error("Error al leer el archivo", error);
      return [];
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false; // La película ya existe
    } else {
      let data: Peli[] = [];
      // Leer las películas existentes
      data = await this.getAll();

      // Agregar la nueva película al array de datos
      data.push(peli);

      // Escribir el objeto actualizado en el archivo

      await jsonfile.writeFile("./pelis.json", data);
      return true; // La película se agregó correctamente
    }
  }

  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    const peli = pelis.find((p) => p.id === id);
    return peli || null;
  }

  async search(options: { tag?: string; title?: string }): Promise<Peli[]> {
    const lista = await this.getAll();

    return lista.filter((peli) => {
      let esteVa = true;
      if (options.tag) {
        esteVa = esteVa && peli.tags.includes(options.tag);
        // lógica de tags
      }
      if (options.title) {
        //sin distinguir entre mayúsculas y minúsculas usando toLowerCase()
        esteVa =
          esteVa &&
          peli.title.toLowerCase().includes(options.title.toLowerCase());
        // lógica de title
      }
      return esteVa;
    });
  }
}

export { PelisCollection, Peli };
