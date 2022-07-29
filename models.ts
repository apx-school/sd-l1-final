import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll() {
    return await jsonfile.readFile("./pelis.json");
      }
  
  async getById(id:number)   {
    const peliculas = await this.getAll();
    return peliculas.find ((pelicula) => {
      return pelicula.id == id;
    })
  }
  
  async search(options:any) {
    const peliculas = await this.getAll();

    if (options.title && options.tags) {
      const buscarPeliculas = peliculas.filter((pelicula) => {
        return pelicula.title.includes(options.title) && pelicula.tags.includes(options.tags)
      })
      return buscarPeliculas
  }
  else if (options.title) {
    const buscarTitulo = peliculas.filter((pelicula) => {
      return pelicula.title.includes(options.title)
    });
    return buscarTitulo

  }

  else if (options.tags) {
  const buscarTags = peliculas.find((pelicula) => {
    return pelicula.tags.includes(options.tags)
  });
  return buscarTags
}
}
async add(pelicula:Peli) {
  const existe = await this.getById(pelicula.id);
  if (existe){
    return false;
  }
  else {
    const peliculas = await this.getAll();
    peliculas.push(pelicula);
    await jsonfile.writefile("./pelis.json", peliculas);
    return true

  }
} 
}
 
export { PelisCollection, Peli };
