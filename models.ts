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
      return pelis;
    });
  }
  getById(id: number) {
    return this.getAll().then((pelis) => {
      const result = pelis.find((peli) => {
        return peli.id == id;
      });
      return result;
    });
  }
  search(options: any) {
    return this.getAll().then((peliculas) => {
      if (options.title && options.tags) {
        return peliculas.filter((objPelis) => {
          const result =
            objPelis.title.includes(options.title) &&
            objPelis.tags.includes(options.tag);
            console.log(result)
          // return result;
        });
      } else if (options.title) {
        return peliculas.filter((pelis) => {
          return pelis.title.includes(options.title);
        });
      } else if (options.tag) {
        return peliculas.filter((pelis) => {
          return pelis.tags.includes(options.tag);
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
        const promesaDos = this.getAll().then((data) => {
          data.push(peli);
          return jsonfile.writeFile("./pelis.json", data);
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}
const peli = new PelisCollection()
peli.search({title:"shrek", tag: ["accion"]}).then((e) => {
  console.log(e)
})
export { PelisCollection, Peli };
