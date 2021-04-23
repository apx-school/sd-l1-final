import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
};

class PelisCollection {
  
  pelis: Peli [] = [];

  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json")
    promesa.then((json: Peli[]) => {
    this.pelis = json
    });    
    return promesa;
  };


  getById(id: number) {
    return this.getAll().then((json) => {
      return json.find((item) => item.id == id);
    });
  }

  search(options: any) {
    return this.getAll().then((json) => {
      let peliculas = json;

      if (options.title) {
        this.pelis = peliculas.filter((pelicula) => {
          return pelicula.title.includes(options.title);
        });
      }
      if (options.tag) {
        this.pelis = peliculas.filter((pelicula) => {
          return pelicula.tags.includes(options.tag);
        });
      }
      return peliculas;
    });
  }


  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.pelis.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.pelis);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };

