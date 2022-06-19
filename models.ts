import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  };

  async getById(id: number): Promise <Peli> {
      const peliculas = await this.getAll();
      return peliculas.find((item) => {
        return item.id === id
      });
  }
      

  async search(options: any): Promise<any> {
    const buscaP = await this.getAll();
    if (options.title && options.tag) {
      return buscaP.filter((peli) => {
        const buscaTitulo = peli.title.includes(options.title);
        const buscaTag = peli.tags.includes(options.tag);
        return buscaTag && buscaTitulo;
      });
      
    } else if (options.title) {
      return buscaP.filter((peli) => peli.title.includes(options.title));
    } else if (options.tag) {
      return buscaP.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
    } else {
      return buscaP;
    }
  }

  async add(peli: Peli): Promise <boolean> {
    const filmExist = await this.getById(peli.id);

      if (filmExist) {
        return false;
 }else { 
        const films = await this.getAll();
        films.push(peli)
        await jsonfile.writeFile ("./pelis.json", films)
          return true;
        }
      
   
} } 
    export { PelisCollection, Peli };
