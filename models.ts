import * as jsonfile from "jsonfile";

const directorioPeliculas = __dirname + "/pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  __listaPeliculas : Peli[] = [];

  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile(directorioPeliculas).then((respuesta : Peli[]) => {
      // la respuesta de la promesa
      this.__listaPeliculas = respuesta;

      return respuesta;
    });
  }

  async getById(id:number) : Promise<Peli>{
    return jsonfile.readFile(directorioPeliculas).then((respuesta : Peli[]) => {
      // la respuesta de la promesa
      this.__listaPeliculas = respuesta;

      return this.__listaPeliculas.find((item:Peli) => {
        return item.id == id;
      });
    });
  }

  async search(options:any) : Promise<Peli[]>{
    return jsonfile.readFile(directorioPeliculas).then((respuesta : Peli[]) => {
      // la respuesta de la promesa
      this.__listaPeliculas = respuesta;

      if(options["title"] != undefined){
        respuesta = respuesta.filter((item) => {
          return item.title.indexOf(options["title"]) != -1;
        });
      };
      
      if(options["tag"] != undefined){
        respuesta = respuesta.filter((item) => {
          return item.tags.indexOf(options["tag"]) != -1;
        });
      };

      return respuesta;
    });
  }

  async add(peli:Peli) : Promise<boolean>{
    return this.getById(peli.id).then((peliExistente) => {
      if(peliExistente){
        return false;
      }
      else{
        this.__listaPeliculas.push(peli);

        return jsonfile.writeFile(directorioPeliculas, this.__listaPeliculas, {spaces: 2}).then(() => {
          return true
        });
      };
    });
  }
}

export { PelisCollection, Peli };
