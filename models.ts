import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
   peliculas: Peli[];
  
  getAll(): Promise<any> {

    const todasLasPelis = jsonfile.readFile("./pelis.json").then((peli) => {
      this.peliculas = peli;
      return peli;
    });
    return todasLasPelis;
  }
  
  getById(id:number): Promise<Peli> {

    return this.getAll().then((peliculas) => {
      return peliculas.find((peli) => {
        return peli.id == id;
      });
    });
  }

  search(options?: any): Promise<any> {
    
    if(options.title && options.tag) {
      return this.getAll().then(() => {
        return this.peliculas.filter((item) => {
          return item.title.includes(options.title) && item.tags.includes(options.tag);
        });
      });
      
    } else if (options.title) {
      return this.getAll().then(() => {
        return this.peliculas.filter((item) => {
          return item.title.includes(options.title);
        });
      });
      
    } else if (options.tag) {
      return this.getAll().then(() => {
        return this.peliculas.filter((item) => {
          return item.tags.includes(options.tag);
        });
      });
    }
  }
  
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        console.log("La peli ya está registrada!");
        return false;
      } else {
        this.peliculas.push(peli);
        const data = this.peliculas;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          console.log("Peli agregada!", peli);
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { Peli, PelisCollection };
