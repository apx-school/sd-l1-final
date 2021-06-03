import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
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
    let promesas;

    if (option.title) {
      promesas = this.getAll().then((pelis) => {
        const pelisPorLetra = pelis.filter(function (peli) {
          return peli.title.toLowerCase().includes(option.title.toLowerCase());
        });
        return pelisPorLetra;
      });
    }

    if (option.tag) {
      promesas = this.getAll().then((pelis) => {
        const pelisPorTag = pelis.filter(function (peli) {
          const buscadorTags = peli.tags.find(function (tags) {
            return tags.toLocaleLowerCase() == option.tag.toLowerCase();
          });
          return buscadorTags;
        });
        return pelisPorTag;
      });
    }
    return promesas;
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
