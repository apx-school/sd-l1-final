import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  db: Peli[];
  filePath: string;
  constructor() {
    this.db = [];
    this.filePath = __dirname + "/pelis.json";
  }
  private async loadFromPath() {
    try {
      const data = jsonfile.readFile(__dirname + "/pelis.json");
      return data as Peli[];
    } catch (error) {
      console.error("Error al leer pelis.json:", error);
      return [];
    }
  }

  async getAll(): Promise<Peli[]> {
    this.db = await this.loadFromPath();
    return this.db;
  }

  async add(pelicula: Peli): Promise<Boolean> {
    this.db = await this.loadFromPath();
    try {
      if (this.db.some((p) => p.id === pelicula.id)) {
        console.log("La ID ingresada ya existe");
        return false;
      }
      console.log(this.db);
      this.db.push(pelicula);
      await jsonfile.writeFile(this.filePath, this.db, { spaces: 2 });
      console.log("La Pelicula se guardo con exito");
      return true;
    } catch (err) {
      throw new Error("err" + err);
      return false;
    }
  }
  async getById(id:number):Promise<Peli>{
    this.db = await this.loadFromPath();
    try{
      const resultado = this.db.filter((p)=>{
        return p.id === id;
      })
      if(resultado.length != 1){
        console.log("La id ingresada no existe")
      }
      else{
        return resultado[0]
      }
    }catch(error){
      throw new Error(error);
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    this.db = await this.loadFromPath();
    try {
      const listaFiltrada = this.db.filter(function (p) {
        let esteVa = false;
        if (options.title && options.tag) {
          if (
            options.title.toLowerCase() === p.title.toLowerCase() &&
            p.tags.includes(options.tag)
          ) {
            esteVa = true;
          }
        } else if (options.title) {
          if (options.title.toLowerCase() === p.title.toLowerCase()) {
            esteVa = true;
          }
        } else if (options.tag) {
          if (p.tags.includes(options.tag)) {
            esteVa = true;
          }
        }
        return esteVa;
      });
      return listaFiltrada;
    } catch (err) {
      throw new Error("Error al cargar el Json");
    }
  }
}
export { PelisCollection, Peli };

// const prueba = new PelisCollection();
// prueba
//   .add({ id: 9, title: "La Aventura", tags: ["action", "adventure"] })
//   .then((resultado) => {
//     console.log(resultado);
//   });
// prueba.getAll().then((resultado)=>{
//   console.log(resultado);
// })

// prueba.search({ title: "La aventura",tag:"adventure"}).then((resultado) => {
//   console.log("Resultado de search: ");
//   console.log(resultado);
// });
// prueba.getById(10).then((resultado)=>{
//   if(resultado === undefined){
//     console.log([])
//   }
//   else{
//     console.log("Resultado: ");
//     console.log(resultado);
//   }

// })
