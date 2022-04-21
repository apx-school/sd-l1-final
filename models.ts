const jsonfile =  require("jsonfile");

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }
 async getById(id: number): Promise<Peli> {
    let pelis = await this.getAll();
    return pelis.find((pelis: Peli) => {return pelis['id'] === id});
  }
  async search(options: any): Promise<any> {
    const pelis = await this.getAll();
    if (options.title && options.tag) {
      return pelis.filter((peli) => {
        const pelisFiltradasByTitle = peli["title"].includes(options.title);
        const tagsDePelisEnLowerCase = peli.tags.map((tag) =>
          tag.toLowerCase()
        );
        const pelisFiltradasByTag = tagsDePelisEnLowerCase.includes(
          options.tag
        );
        return pelisFiltradasByTitle && pelisFiltradasByTag;
      });
    } else if (options.title) {
      return pelis.filter((peli) => peli["title"].includes(options.title));
    } else if (options.tag) {
      return pelis.filter((peli) => {
        const tagsDePelisEnLowerCase = peli.tags.map((tag) =>
          tag.toLowerCase()
        );
        return tagsDePelisEnLowerCase.includes(options.tag);
      });
    } else {
      console.log("Ese comando no existe, las peliculas son las siguientes:");
      return pelis;
    }
  }
  async add(peli: Peli): Promise<boolean> {
    const idPeliExiste = await this.getById(peli.id);
    if (idPeliExiste) {
      console.log(
        "No se admiten agregar películas con un Id que ya existe en la base de datos"
      );
      return false;
    }
    const pelis = await this.getAll();
    pelis.push(peli);
    await jsonfile.writeFile("./pelis.json", pelis);
    console.log("La pelicula:", peli, "se agrego correctamente");
    return true;
  }
}

// const pelcol = new PelisCollection;
// const search = pelcol.search({title: 'k'});
// console.log(search[0].id);

export { PelisCollection, Peli };