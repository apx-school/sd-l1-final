import * as jsonfile from "jsonfile";
import { title } from "node:process";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];
  //metodo para obtener todas las pelis
  getAll(): Promise<Peli[]> {
    // obtenemos informacion del pelis.json
    return jsonfile.readFile("./pelis.json").then((p) => {
      return p;
    });
  }

  // Metodo para buscar una pelicula por ID
  getById(id: number) {
    // con el get all creo la promesa, y para retornar la resuelvo con el then
    return this.getAll().then((productos) => {
      const resultado = productos.find((prod) => {
        return prod.id == id;
      });
      return resultado;
    });
  }
  //Metodo para buscar por propiedades
  // ssearch(options: any) {
  //   //Obtenemos todas las peliculas con la promesa
  //   const promesaPelis = this.getAll();

  //   // hago el proceso
  //   const promesaBusqueda = promesaPelis.then((p) => {
  //     //variable auxiliar
  //     let resultado: Peli[];
  //     //ahora segun las opciones que nos brinda el usuario hacemos la busqueda
  //     if (options.title && options.tags) {
  //       resultado = p.filter((i) => {
  //         i.title.includes(options.title) && i.tags.includes(options.tags);
  //       });
  //     }
  //     //si solo hay titulo
  //     else if (options.title) {
  //       resultado = p.filter((i) => {
  //         i.title.includes(options.title);
  //       });
  //     }
  //     // si solo hay tags
  //     else if (options.tags) {
  //       resultado = p.filter((i) => {
  //         i.tags.includes(options.tags);
  //       });
  //     }
  //     return resultado;
  //   });
  //   return promesaBusqueda;
  // }
  search(options: any) {
    return this.getAll().then((p) => {
      if (options.title && options.tag) {
        return p.filter((i) => {
          return (
            i.title.toLowerCase().includes(options.title) &&
            i.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return p.filter((i) => {
          return i.title.toLowerCase().includes(options.title);
        });
      } else if (options.tag) {
        return p.filter((i) => {
          return i.tags.includes(options.tag);
        });
      }
    });
  }
  // Metodo para agregar una pelicula al archivo pelis.json
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then((p) => {
          p.push(peli);
          return jsonfile.writeFile("./pelis.json", p);
        });
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
