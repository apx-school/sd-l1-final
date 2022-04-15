import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      // la respuesta de la promesa
      return json;
    });
  }
  getById(id: number) {
    return this.getAll().then((pelis) => {
      const pelisPorId = pelis.find((peli) => {
        return peli.id == id;
      });
      return pelisPorId;
    });
  }
  search(option: any) {
    return this.getAll().then((pelis) => {
      let collection = pelis;

      if (option.title) {
        collection = collection.filter(function (peli) {
          return peli.title
            .toLowerCase()
            .includes(option.title.toString().toLowerCase());
        });
      }

      if (option.tag) {
        collection = collection.filter(function (peli) {
          const buscadorTags = peli.tags.find(function (tags) {
            return tags.toLowerCase() == option.tag.toLowerCase();
          });
          return buscadorTags;
        });
      }
      return collection;
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data

        const data = this.getAll().then((data) => {
          data.push(peli);
          return data;
        });

        return data.then((todaLaData) => {
          const promesaDos = jsonfile.writeFile("./pelis.json", todaLaData);

          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };

// MOCK

const probadorClase = new PelisCollection();

// probadorClase.getAll().then((resultado) => {
//   console.log(resultado);
// });

// probadorClase.getById(2).then((resultado) => {
//   console.log(resultado);
// });

// probadorClase.search({ title: "d" }).then((resultado) => {
//   console.log(resultado);
// });

// probadorClase.search({ tag: "clasica" }).then((resultado) => {
//   console.log(resultado);
// });

// probadorClase
//   .add({ id: 9, title: "nueva peli", tags: ["accion", "clasica"] })
//   .then((resultado) => {
//     console.log(resultado);
//   });
