import * as jsonfile from "jsonfile";
const json = jsonfile.readFile("./pelis.json")


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  getAll() {
    return json.then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
  }

  getById(id: number) {
    return this.getAll().then((pelis) => {
      return pelis.find(pelicula => {
        return pelicula.id == id;
      })
    })
  }


  search(options: any) {
    return this.getAll().then((listaPelis) => {
      if (options.title && options.tag) {
        return listaPelis.filter((item) => {
          return item.title.includes(options.title) && item.tags.includes(options.tag);
        });
      }
      if (options.title) {
        return listaPelis.filter((item) => {
          return item.title.includes(options.title);
        });
      }
      if (options.tag) {
        return listaPelis.filter((item) => {
          return item.tags.includes(options.tag);
        });
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data

        const promesaDos = this.getAll().then(data => {
          data.push(peli)
          return jsonfile.writeFile("./pelis.json", data);
        })


        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

//me olvidé de comentar esto para testear que todo estaba funcionando por consola, esto era lo que hacia que me imprimiera todas las peliculas

/* const prueba = new PelisCollection();

prueba.getAll().then(resultado => {
  console.log(resultado);
}) */

export { PelisCollection, Peli };
