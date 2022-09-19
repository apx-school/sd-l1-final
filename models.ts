import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[];
  // getAll() devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas en el archivo JSON de pelis.
  async getAll(): Promise<Peli[]> {
    return this.pelis = await jsonfile.readFile(__dirname + '/pelis.json');
  }
  // getById(id:number) devuelve la peli que tenga el id que se le pase por parámetro.
  async getById(id:number): Promise<Peli>{
    await this.getAll();
    return this.pelis.find(peli => peli.id == id);
  }
  // search(options:any) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
  async search(options:any): Promise<any>{
    await this.getAll();
    if (options.title) {
      return this.pelis.filter(peli => peli.title.includes(options.title));
    }
    if (options.tags) {
      return this.pelis.filter(peli => peli.tags.includes(options.tags));
    }
  }
  async add(peli: Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente => {
      if(peliExistente){
        // Si una peli con ese id ya existe retornamos false
        return false;
      }
      else {
        return this.getAll().then(pelis => {
          // Traemos las pelis e incluimos la nueva
          pelis.push(peli);
          // Re escribimos el json
          const promesaDos = jsonfile.writeFile("./pelis.json", pelis);
          // Devuelve una promesa, entonces cuando se haya escrito retorná true
          return promesaDos.then(() => {
            return true;
          })
        })
      }
    }));
    // Devuelve el true o false
    return promesaUno;
  }
}

export { PelisCollection, Peli };


