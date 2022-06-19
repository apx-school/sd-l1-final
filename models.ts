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
    var busca = await this.getAll();
    if (options.title) {
      var sol = busca.filter((p) => {
        return p.title.includes(options.title);
      });
      busca = res;
    }
    if (options.tag) {
      var res = busca.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
      busca = res;
    }
    return busca;
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
