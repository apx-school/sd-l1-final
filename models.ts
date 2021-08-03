import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
  };
  getById(id:number){
    return this.getAll().then((peli)=>{
        const resultado = peli.find((movie)=>{
        return movie.id == id
      })
      return resultado
    })
  }
  search(options:any): Promise<any>{
    return this.getAll().then((pelis)=>{
      if (options.title && options.tag) {
        return pelis.filter((movies)=>{
          return movies.title.includes(options.title) && movies.tags.includes(options.tag)
        })
      }else if (options.title) {
        return pelis.filter((moviesDos)=>{
          return moviesDos.title.includes(options.title)
        })
      }else if (options.tag) {
        return pelis.filter((moviesTres)=>{
          return moviesTres.tags.includes(options.tag)
        })
      }
    })
  }
  add(peli:Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
          const promesaDos = this.getAll().then((movies)=>{
            movies.push(peli);  
            return jsonfile.writeFile("./pelis.json", movies);
          }) 
            return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}
export { PelisCollection, Peli };


//instancias de prueba

const peliDePrueba = new PelisCollection;
// peliDePrueba.getAll().then((peli)=>{
//   console.log(peli)
// });
// peliDePrueba.getById(1).then((peli)=>{
//   console.log(peli)
// })
