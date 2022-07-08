import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json")
  };

   async getById(id:number) {
     const peliId = await this.getAll();
     return peliId.find((pelicula) => {
      return pelicula.id == id;
     });
   }
   async search(options:any) {
    const buscaPeli = await this.getAll();

    if (options.title && options.tags) {
      const peliEncontrada= buscaPeli.filter((peli) =>{
        return peli.title.includes(options.title) && peli.tags.includes(options.tags)
      })
      return peliEncontrada;
    }
     else if(options.title){
      const buscaTitulo = buscaPeli.filter((peli) => {
        return peli.title.includes(options.title)
      });
      return buscaTitulo
     }
     else if(options.tags){
      const buscaTags = buscaPeli.filter((peli) => {
        return peli.tags.includes(options.tags)
      });
      return buscaTags
     }
   }
   async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id)
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const pelis = await this.getAll();
        pelis.push(peli);
        await jsonfile.writeFile("./pelis.json", pelis);
          return true;
        };
      }
   };



export { PelisCollection, Peli };
