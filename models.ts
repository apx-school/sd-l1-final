import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./peliculas.json").then((peliculas) => {
      return peliculas;
    });
  }
  async getById(id:number){
    const pelis = await this.getAll();
    const found = pelis.find((peli) => peli.id == id);
    return found;
  }
  async search(options: any): Promise<any> {

    const PELIS = await this.getAll();

    if(options.title && options.tag) {

        const TITLES_FOUND = PELIS.filter( (e) => e.title.includes(options.title) );

        return TITLES_FOUND.filter( (e: any) => e.tags.find( (tag: any) => tag == options.tag ) == options.tag );

    } else if(options.title) {

        return PELIS.filter( (e: any) => e.title.includes(options.title) );

    } else if(options.tag) {

        return PELIS.filter( (e: any) => e.tags.find( (tag: any) => tag == options.tag ) == options.tag );
    }
}

async add(peli: any): Promise<boolean> {
    const EXISTE = await this.getById(peli.id);
            
    if(EXISTE) {
        return false;
    } else {
        const pelis = await this.getAll();
        pelis.push(peli);
        await jsonfile.writeFile("./peliculas.json", pelis);
        return true;
    }                
  }
}

export { PelisCollection, Peli };

