import * as jsonfile from "jsonfile";
import { title } from "process";
import { isTaggedTemplateExpression, isTemplateExpression } from "typescript";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
  }

  getById(id: number) {
    return this.getAll().then((peli) => {
      const resultado = peli.find((peliBuscada) => {
        return peliBuscada.id == id;
      });
      return resultado;
    });
  }

  async search(options: any) {
    const todas = await this.getAll();
    if (options.title && options.tag) {
      const respuesta = todas.filter((pelis) => {
        return (
          pelis.title.includes(options.title) &&
          pelis.tags.includes(options.tag)
        );
      });
      return respuesta;
    } else if (options.title) {
      const respuesta = todas.filter((pelis) => {
        return pelis.title.includes(options.title);
      });
      return respuesta;
    } else if (options.tag) {
      const respuesta = todas.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
      return respuesta;
    }
  }

  async add(peli: Peli) {
    if (await this.getById(peli.id)) {
      return false;
    } else {
      const todas = await this.getAll();
      todas.push(peli);
      await jsonfile.writeFile("./pelis.json", todas);
      return true;
    }
  }
}

//prueba
// const objeto = new PelisCollection();
// objeto.getById(3).then((resultado) => {
//   console.log(resultado);
// });

export { PelisCollection, Peli };
