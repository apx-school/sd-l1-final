import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = [];

  constructor(){
    this.getAll().then((peliculasJson)=>{
      this.peliculas = peliculasJson;
    });
  }

  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      // la respuesta de la promesa
      return peliculas;
    });
  }
getById(id: number): Promise<any>{
  return this.getAll().then((peliculas)=>{
    return peliculas.find((peli) => {
      return peli.id == id;
    });
  });
}
  search(options: any): Promise<any> {
    return this.getAll().then((peliculas)=>{
      if(options.title && options.tag){
        var pelisConTags = peliculas.filter((peli)=>{
          return peli.tags.find((tag)=>{
            if (options.tag == tag){
              return true;
            }
          });
        });
        var resultado = pelisConTags.filter((peli)=>{
          return peli.title.includes(options.title);
        });
        return resultado;
      } else {
        if (options.tag) {
          return peliculas.filter((peli) => {
            return peli.tags.find((tag) => {
              if (options.tag == tag) {
                return true;
              }
            });
          });
        } else {
          if (options.title) {
            return peliculas.filter((peli) => {

              if (peli.title.includes(options.title)) {
                return peli;
              }
            });
          }
        }
      }
    });
  }
add(peli: Peli): Promise<any> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((peliculas) => {
          peliculas.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", peliculas);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };