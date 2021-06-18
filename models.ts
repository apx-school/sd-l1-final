import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data : Peli[] = [];
  getAll(): Promise<any[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      this.data = pelis;
      return pelis;
    });
  }
  getById(id: number){
    return this.getAll().then((peliculas) => {
      return peliculas.find(pelis => pelis.id == id);
    });
  }
  search(options:any){
    if(options.title && options.tag) {
      return this.getAll().then((peliculas) => {
        return peliculas.filter((item) => {
          return item.title.includes(options.title) && item.tags.includes(options.tag);
        });
      });
    } else if(options.title){
      return this.getAll().then((peliculas) => {
        return peliculas.filter((item) => {
          return item.title.includes(options.title);
        });
      });
    } else if(options.tag){
        return this.getAll().then((peliculas) => {
          return peliculas.filter((item) => {
            return item.tags.includes(options.tag);
          });
        });
    }
  }
  add(peli:Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if(peliExistente){
        return false;
      } else {
        //magia que agrega la peli a un obj data
        this.data.push(peli);
        const data = this.data;

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

// PRUEBAS

// const peliculas = new PelisCollection();

// peliculas.getAll().then((pelis) => {
//   console.log(pelis);
// });

// peliculas.getById(5).then((producto) => {
//   console.log(producto);
// });

// peliculas.search({"title": "El", "tag": "Acción"}).then((prod) => {
//   console.log(prod);
// });

// peliculas.search({"tag": "Drama"}).then((prod) => {
//   console.log(prod);
// });

// peliculas.add({
//   "id": 6,
//   "title": "El Hocker",
//   "tags": ["Drama", "Acción", "Fantasía"]
// }).then((peli) => {
//   console.log(peli);
// })