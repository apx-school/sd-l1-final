import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelisCollection: Peli[] = [];
  getAll(): Promise<Peli[]> {
    const pelisMostradas = jsonfile.readFile("./pelis.json").then((pelis: Peli[]) => {
      return this.pelisCollection = pelis;
    });
    return pelisMostradas.then((res) => { return res });
  }
 
  async getById(id: number): Promise<Peli> {
    await this.getAll();
    const peliEncontrada = await this.pelisCollection.find((p) => {
      return p.id == id;
    });
    return peliEncontrada;
  }
  
  async search(options): Promise<any> {
    const listaDePeliculas = await this.getAll();
     if (options.title && options.tag) {
      const pelisFiltradasPorTitleAndTags = listaDePeliculas.filter((pelis) => {
        return pelis.title.includes(options.title) && pelis.tags.includes(options.tag);
      });
      return pelisFiltradasPorTitleAndTags;
    }
    else if (options.title) {
      const pelisFiltradasPorTitle = listaDePeliculas.filter((pelis) => {
        return pelis.title.includes(options.title);
      });
      return pelisFiltradasPorTitle;
    }
    else if (options.tag) {
      const pelisFiltradasPorTags = listaDePeliculas.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
      return pelisFiltradasPorTags;
    }

  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        this.pelisCollection.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.pelisCollection);
  
        return promesaDos.then(() => {
          return true;
        });
      }
    });
  
    return promesaUno;
  }
}
  
//function main() {
  //const prueba = new PelisCollection;
  //const view = prueba.add();
  //console.log(view);
//}
  
//main();

export { PelisCollection, Peli };
