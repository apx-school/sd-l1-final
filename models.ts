import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  //devuelve todas las películas
  async getAll(): Promise<any> {
    const misPeliculas = await jsonfile.readFile("./pelis.json")

    return misPeliculas
  }

  //filtra películas por ID
  async getById(id:number): Promise<any> {
    const peliculas = await this.getAll()
    const peliFinder = peliculas.find((peli)=>{
      return peli.id == id
    })
    return peliFinder
  }

  async search(options:any):Promise<any>{
    const peliculas =  await this.getAll()
    if (options.tags && options.title){
      const peliTagsYTitles = peliculas.filter((peli)=>{
        return(peli.tags.includes(options.tags) && 
        peli.title.includes(options.title))
      })
      return peliTagsYTitles
    } else if (options.title){
      const peliTitle = peliculas.filter((peli)=>{
        return peli.title.includes(options.title)
      })
      return peliTitle
    } else if (options.tags){
      const peliTags = peliculas.filter((peli)=>{
        return peli.tags.includes(options.tags)
      })
      return peliTags
    } 
  }

  async add(peli: Peli): Promise<any> {
    const promesaUno = await this.getById(peli.id).then(async (peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const peliculas = await this.getAll()
        peliculas.push(peli)
        const promesaDos = jsonfile.writeFile("./pelis.json", peliculas);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };