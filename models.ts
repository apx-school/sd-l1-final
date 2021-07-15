import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class SearchOptions {
  title?: any;
  tag?: string;
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      // la respuesta de la promesa
      return peliculas;
    });
  }
  getById(id:number){
    return this.getAll().then((peliculas)=>{
      const resultado = peliculas.find((peli) =>{
        return peli.id == id
      });
      return resultado;
    
    });
  }

  search(options: SearchOptions): Promise<Peli[]> {
    if (options.title && options.tag) {
      return this.getAll().then((pelis) => {
        return pelis.filter(
          (peli) =>
            peli.title.includes(options.title) &&
            peli.tags.includes(options.tag)
        );
      });
    } else if (options.title) {
      return this.searchBy("title", options.title);
    } else if (options.tag) {
      return this.searchBy("tags", options.tag);
    }
  }
  searchBy(searchByOption: "title" | "tags", param: string): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      return pelis.filter((peli) => peli[searchByOption].includes(param));
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const promesaDos = this.getAll().then((peliculas)=>{
          peliculas.push(peli);
          return jsonfile.writeFile("./pelis.json", peliculas);
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli, SearchOptions };