import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
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
          const result =  objPelis.title.includes(options.title) && objPelis.tags.includes(options.tag)
           return  result
        });
      } else if (options.title) {
        return peliculas.filter((pelis) => {
          return pelis.title.includes(options);
          
         
        });
      } else if (options.tags) {
        return peliculas.filter((pelis) => {
          return pelis.tags.includes(options.tags);
        });
      }
    });
  }
}

const peli = new PelisCollection();
peli.search({title:"ce"}).then((resultado) => {
  console.log(resultado);
});

export { PelisCollection, Peli };
