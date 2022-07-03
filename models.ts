import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  async getAll(){
    return await jsonfile.readFile("./pelis.json");
    
  }

  async getById(id: number ){
    const movies = await this.getAll();
    return movies.find((movie)=>{
      return movie.id == id;
    })
  }

  async search(options:any){

    const movies = await this.getAll();

    if (options.title && options.tags) {
      const searchMovies = movies.filter((movie) => {
        return movie.title.includes(options.title) && movie.tags.includes(options.tags)
      })
      return searchMovies
    }

    else if (options.title) {
      const searchTitle = movies.filter((movie) => {
        return movie.title.includes(options.title)
      });
      return searchTitle
    }

    else if (options.tags) {
      const searchTags = movies.find((movie) => {
        return movie.tags.includes(options.tags)
      });
      return searchTags
    }

  }     
  
  async add(movie: Peli){
    const checkExistence = await this.getById(movie.id);
    if (checkExistence) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const movies = await this.getAll();        
        movies.push(movie);
        await jsonfile.writeFile("./pelis.json", movies);
        return true;
      }
    }
}


//const prueba = new PelisCollection
//prueba.getAll().then((pelis)=> console.log(pelis));
//prueba.getById(21).then((pelis)=> console.log(pelis));

//const objetoPrueba = {tags : "classic"};


//prueba.search(objetoPrueba).then((pelis)=> console.log(pelis));


//const objetoPrueba = {id: 23, title: "prueba", tags : ["actio", "xxxx"] };

//prueba.add(objetoPrueba).then((pelis)=> console.log(pelis));



//console.log(prueba.getAll());


export { PelisCollection, Peli };
