import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json");
    promesa.then((res) => {
      this.data = res;
    });
    return promesa;
  }
  getById(id: number): Promise<any> {
    const promesa = this.getAll().then(() => {
      return this.data.find((item) => item.id == id);
    });
    return promesa;
  }
  search(search: any): Promise<any> {
    return this.getAll().then((item) => {
      let peliculas = item;
      if (search.title) {
        peliculas = peliculas.filter((pelicula) => {
          return pelicula.title.includes(search.title);
        });
      }
      if (search.tag) {
        peliculas = peliculas.filter((pelicula) => {
          return pelicula.tags.includes(search.tag);
        });
      }
      return peliculas;
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliRepetida) => {
      if (peliRepetida) {
        return false;
      } else {
        this.data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };
