import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll() {
    return jsonfile.readFile("./pelis.json").then( (peliculasDelFile) => {
      return peliculasDelFile;
    });
  }
  getById( id:number ) {
    return this.getAll().then((peliculasDelFile) => {
        return peliculasDelFile.find((peliculaABuscar) => {
            return peliculaABuscar.id == id;
        });
    });
  } 
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then((peliculasDelFile)=>{
          peliculasDelFile.push(peli);
          return jsonfile.writeFile("./pelis.json", peliculasDelFile);
        });
        return promesaDos.then(() => {
          return true;
        });
      }
    });
  }
  search( options:any ) {
    if( options.title && options.tag ){            
      return this.getAll().then((peliculas) => {
        return peliculas.filter((pelicula) => {
            return pelicula.title.includes(options.title) && pelicula.tags.includes(options.tag);
        });
      });
    }else if( options.title ){                     
      return this.getAll().then((peliculas) => {
        return peliculas.filter((pelicula) => {
            return pelicula.title.includes(options.title);
        });
      });
    }else if( options.tag ){                       
      return this.getAll().then((peliculas) => {
        return peliculas.filter((pelicula) => {
            return pelicula.tags.includes(options.tag);
        });
      });
    }
  }
}

export { PelisCollection, Peli };