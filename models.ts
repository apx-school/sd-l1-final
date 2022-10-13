import { readFile } from "fs";
import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
  async getAll(): Promise<Peli[]> {
    const data = await jsonfile.readFile(__dirname + "/pelis.json" );
    return (this.peliculas = data);
  }

  async getById(id:number): Promise<Peli>{
    await this.getAll();
    const byId = this.peliculas.find((i)=>i.id == id);
    return byId
  }




  async search(options: any): Promise<Peli[]>{
    await this.getAll();
    if(options.title && options.tag){
      return this.peliculas.filter((i)=>{
        return (i.title.includes(options.title) && i.tags.includes(options.tag))
      });
    }
    if(options.title){
      return this.peliculas.filter((i)=>{
        return i.title.includes(options.title);
      });
    }
    if(options.tag){
      return this.peliculas.filter((i)=>{
        return i.tags.includes(options.tag)
      });
    }
  }


    async add(peli: Peli): Promise<boolean> {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          return this.getAll().then((i)=>{
            i.push(peli);
            const promesaDos = jsonfile.writeFile("./pelis.json", i);
            return promesaDos.then(() => {
              return true;
            });
          })
        }
      });
      return promesaUno
    }
}


async function main(){
  const peliCollection1 = new PelisCollection;
  peliCollection1.getAll();
  const peli = new Peli;
}
main()
export { PelisCollection, Peli };
