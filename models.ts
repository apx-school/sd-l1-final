import { readFile } from "fs/promises";
import * as jsonfile from "jsonfile";
import { pull } from "lodash/pull";
import { type } from "os";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peli: Peli[];

  getAll(): Promise<Peli[]> {
    return jsonfile
      .readFile(__dirname + "/pelis.json")
      .then((pelis: Peli[]) => {
        this.peli = pelis;
        return this.peli;
      });
  }

  async getById(id: number): Promise<Peli> {
    await this.getAll();
    const peliEncontrada = this.peli.find((lista) => id === lista.id);
    return peliEncontrada;
  }

  async search(option): Promise<Peli[]> {
    const listaCompleta = await this.getAll();

    const peliEncontrada = listaCompleta.filter((lista) => {
      let validacion = false;

      if (option.tag) {
        if (lista.tags.includes(option.tag)) {
          validacion = true;
          return lista;
        }
      }
      if (option.title) {
        if (lista.title.includes(option.title)) {
          validacion = true;
          return lista;
        }
      }

      return validacion;
    });

    return peliEncontrada;
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then(() => {
          this.peli.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", this.peli);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
}

// const listaMock = new PelisCollection();

// async function imprimir() {
//   const objeto = await listaMock.search({ tag: "Crimen" });
//   console.log("Models.ts");
//   console.log(objeto);
// }
// imprimir();

export { PelisCollection, Peli };
