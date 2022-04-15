import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      // la respuesta de la promesa
      return peliculas;
    });
  }
  getById(id:number){
    return this.getAll().then((item) => {
      const resultado = item.find((peliculas) => {
        return peliculas.id == id
      });
      return resultado 
    })
  }
  search(options: any): Promise<any> {
    //return this.getAll().then((pelis) => {
      if(options.title && options.tag){
        return this.getAll().then((peliculas) => {
          const busqueda = peliculas.filter((peliculass) => {
            return peliculass.title.includes(options.title) && peliculass.tags.includes(options.tag)
          })
          return busqueda
        }); 
      } else if (options.tag){
        return this.getAll().then(( peliculasss => {
          const busqueda = peliculasss.filter((item) => {
            return item.tags.includes(options.tag)
          });
          return busqueda
        }));
      } else if (options.title){
        return this.getAll().then(peliculassss => {
          const busqueda= peliculassss.filter(( g=> {
            return g.title.includes(options.title);
          }))
          return busqueda
        })
      }
  }

  add(peli:Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if(peliExistente) {
        return false;
      } else {
        const promesaDos =  this.getAll().then((peliculas) => {
          peliculas.push(peli);
          return jsonfile.writeFile("./pelis.json", peliculas)
        })
      
      return promesaDos.then(() => {
        return true
      });
      }
    })
    return promesaUno
  }
}

export { PelisCollection, Peli };
