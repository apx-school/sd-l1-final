import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelicula) => {
      return pelicula.find((item) => {
        return item.id == id;
      });
    });
  }
  search(options: any): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((item) => {
          return (
            item.title.includes(options.title) &&
            item.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return pelis.filter((item) => {
          return item.title.includes(options.title);
        });
      } else if (options.tag) {
        return pelis.filter((item) => {
          return item.tags.includes(options.tag);
        });
      }
    });
  }
  add(peli: Peli): Promise<Peli> {
    return this.getById(peli.id).then((respuestaExistente) => {
      if (respuestaExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis).then(() => {
            return true;
          });
        });
      }
    });
  }
}
export { PelisCollection, Peli };
/*const objeto = new PelisCollection();
//// PROBADOR GETBYID ////
/*objeto.getById(2).then((resultado) => {
  console.log(resultado);
});*/

//// PROBADOR DE SEARCH TITLE AND TAG ////

/* const objeto = new PelisCollection();
objeto.search({ tag: "comédia" }).then((respuesta) => {
  console.log(respuesta);
}); */

//// PROBADOR METODO ADD ////
/*objeto
  .add({ id: 547, title: "risas", tags: ["drama", "jojojo"] })
  .then((respuesta) => {
    console.log(respuesta);
  });*/
