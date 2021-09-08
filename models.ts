import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  getAll(): Promise<any[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }
  

  getById(id: number) {
    return this.getAll().then((pelis) => {
      const peliById = pelis.find((obtenerUnaPeli) => {
        return obtenerUnaPeli.id == id;
      });
      return peliById;
    });
  }

  search(options) {
    return this.getAll().then((pelis) => {

      if (options.title && options.tag) {
        return pelis.filter((peli) => {
          return(
            peli.title.includes(options.title) &&
            peli.tags.includes(options.tag)
            )
        });

      } else if (options.title) {
        return pelis.filter((peli) => {
          return peli.title.includes(options.title);
        });

      } else if (options.tag) {
        return pelis.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    
    // console.log(peli);
    
    const promesaUno = this.getById(peli.id).then((peliExistente) => {

      if (peliExistente) {
        return false;

      } else {
          const promesaDos = this.getAll().then((pelis) => {
            pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis);
        });
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

// const objeto = new PelisCollection();
// objeto.getAll().then((resultado) => {
//   console.log(resultado);
// })

// objeto.getById(1).then((resultado) => {
//   console.log(resultado);
// })

// objeto.search({title: 'a'}).then((resultado) => {
  // console.log(resultado);
// })
// objeto.search({"tag": "finanzas"}).then((resultado) => {
//   console.log(resultado);
// })
// objeto.search({"title": "espanta","tag": "animación"}).then((resultado) => {
//   console.log(resultado);
// })

// objeto.add({"id": 10, "title": "Guardianes de la galaxia", "tags": ["comedia"]}).then((resultado) => {
//     console.log(resultado);
// })


export { PelisCollection, Peli };
