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
    const file = jsonfile.readFile("./pelis.json");
    file.then((content) => {
      // la respuesta de la promesa
      this.data = content;
    });
    return file;
  }
  getById(id: number): Promise<Peli> {
    const promesaDePeliEncontrada = this.getAll().then(() => {
      const encontrado = this.data.find((item) => {
        return item.id == id;
      });
      return encontrado;
    });
    return promesaDePeliEncontrada;
  }

  search(options: any): Promise<Peli[]> {
    const pelis = this.getAll();
    var peliEncontrada;
    const promesa = pelis.then((arrayPelis) => {
      if (options.title && options.tag) {
        peliEncontrada = arrayPelis.filter((item) => {
          return (
            item.title.includes(options.title) &&
            item.tags.includes(options.tag)
          );
        });
        return peliEncontrada;
      } else if (options.title) {
        peliEncontrada = arrayPelis.filter((item) => {
          return (
            item.title.includes(options.title) ||
            item.title.toLocaleLowerCase().includes(options.title)
          );
        });
        return peliEncontrada;
      } else if (options.tag) {
        peliEncontrada = arrayPelis.filter((item) => {
          return item.tags.includes(options.tag);
        });
        return peliEncontrada;
      }
    });
    return promesa;
  }
  add(peli: Peli): Promise<boolean> {
    const promesaPeliExistente = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const promesaPelisGuardadas = jsonfile.writeFile(
          "./pelis.json",
          this.data
        );
        return promesaPelisGuardadas.then(() => {
          return true;
        });
      }
    });
    return promesaPeliExistente;
  }
}

export { PelisCollection, Peli };

// function main() {
//   const prueba = new PelisCollection();
//   const promesa = prueba.getAll();
//   const segundaPromesa = promesa.then((resultado) => {
//     // console.log(resultado); //acá muestro el json completo;
//     const getId = prueba.getById(4);
//     getId.then((getId) => {
//       // console.log(getId);
//     });
//     const getSearch = prueba.search({ title: "Scarface", tags: "Drogas" });
//     getSearch.then((getSearch) => {
//       console.log(getSearch);
//     });
//   });
// }

// main();
