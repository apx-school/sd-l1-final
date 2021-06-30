import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  // devuelve las pelis en forma de promesa
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }
  // devuelve la peli que tiene el id que le paso
  getById(id: number) {
    return this.getAll().then((pelis) => {
      const result = pelis.find((peli) => {
        return peli.id == id;
      });
      return result;
    });
  }
  // busca la peli por el titulo y tag que le paso o solo titulo o solo por el tag
  search(options: any) {
    return this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        return peliculas.filter((objPelis) => {
          const result =
            objPelis.title.includes(options.title) &&
            objPelis.tags.includes(options.tag);
            
          return result;
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
  // se fija si existe una peli y si no existe la agrega y la escribe en el json en forma de promesa
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

export { PelisCollection, Peli };
