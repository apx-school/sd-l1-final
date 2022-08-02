import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((collection) => {
      // la respuesta de la promesa
      return collection;
    });
  }
  getById(id:number) {
    return this.getAll().then((collection) => {
      return collection.find((item) => item.id == id)
    })
  }
  search(options:any) {
    if (options.title) {
      return this.getAll().then((collection) => {
        return collection.filter((item) => item.title == options.title)
      })
    } else if(options.tag) {
      return this.getAll().then((collection) => {
        return collection.filter((item) => item.tags == options.tag)
      })
    }
  }
  add(peli:Peli) {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = {...};
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };




const prueba = new PelisCollection()
console.log("getAll", prueba.getAll());
console.log("getById", prueba.getById(2));
console.log("search", prueba.search({title: "time"}));
