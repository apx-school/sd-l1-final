import * as jsonfile from "jsonfile";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  // data: Peli[] = []

  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }
  async getById(id: number): Promise<Peli>  {
    const lasPelis = await this.getAll();
    return lasPelis.find((idPeli) => {
      return idPeli.id === id
    });
  }

async search(options: any):Promise<any>{
  const pelis = await this.getAll();

  if (options.title && options.tag) {
    const encontrar = pelis.filter((titlePeli) => {
      return titlePeli.title.includes(options.title) && titlePeli.tags.includes(options.tag)
    })
    return encontrar
  }
  else if (options.title) {
    const tituloEncontrado = pelis.filter((titlepeli) => {
      return titlepeli.title.includes(options.title)
    });
    return tituloEncontrado
  }
  else if (options.tag) {
    const tagEncontrado = pelis.find((tagPeli) => {
      return tagPeli.tags.includes(options.tag)
    });
    return tagEncontrado
  }
  }
  async add(peli: Peli) {
    const peliIdExistente = await this.getById(peli.id);
    if (peliIdExistente) {
      return false;
    }
    const pelis = await this.getAll();
    pelis.push(peli)
    await jsonfile.writeFile("./pelis.json", pelis);
    
    return true
    }

}


export { PelisCollection, Peli };
