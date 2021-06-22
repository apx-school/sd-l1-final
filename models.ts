import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  peliculas:Peli[] = []
  // devolver todas las pelis
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return (this.peliculas = pelis);
    })
  };
  // buscar por ID 
  getById(id:number): Promise<Peli> {
    return this.getAll().then((pelis) => {
        return pelis.find((i) => i.id == id);
    });
  };
  // buscar por titulo o tags correspondientes
  search(options: any): Promise<any> {
    return this.getAll().then((peliculas) => {
      return peliculas.filter((item) => {
        if (options.title && options.tag) {
          return (
            item.title.includes(options.title) && item.tags.includes(options.tag)
          );
        } else if (options.title) {
          return item.title.includes(options.title);
        } else if (options.tag) {
          return item.tags.includes(options.tag);
        }
      });
    });
  };
  // agregar peliculas a la base de datos
  add(peli: Peli): Promise<boolean> {
    const promesaId = this.getById(peli.id).then((peliId) => {
      if (peliId) {
        return false;
      } else {
        this.peliculas.push(peli);
        const dataPelis = this.peliculas;
        const promesa = jsonfile.writeFile("./pelis.json", dataPelis);
        return promesa.then(() => {
          return true;
        });
      }
    });
    return promesaId;
  }
}

    
export { PelisCollection, Peli };
