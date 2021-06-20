import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  title: string;
  id: number;
  tags: string[];
}

class PelisCollection {

  peliculas: Peli[];

  getAll(): Promise<Peli[]> {
      const todasLasPelis = jsonfile.readFile("./pelis.json").then((pelis) => {
        this.peliculas = pelis
      return pelis;
    });return todasLasPelis;
  }


  getById(id: number): Promise<Peli> {
    return this.getAll().then((listaPelis) => {
      return listaPelis.find((item) => {
        return item.id == id;
      });
    });
  }

  
  search(options?: any): Promise<Peli[]> {
    
    return this.getAll().then((listaPelis) => {

      if (options.title && options.tag){
         return listaPelis.filter((item)=>{
          return item.title.includes(options.title) && item.tags.includes(options.tag);
        });
      }else if (options.title) {
        return listaPelis.filter((item) => {
          return item.title.includes(options.title);
        });
      }else if (options.tag) {
        return listaPelis.filter((item) => {
          return item.tags.includes(options.tag);
        });
      }
      
    });
  }
  

  add(peli:Peli):Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente)=>{
      if(peliExistente) {
        console.log("pelicula ya existe")
        return false;
      } else {
        this.peliculas.push(peli);
        const data = this.peliculas;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(()=>{
            return true;
          
        })
      }
    })
    return promesaUno;
  }
}




export {PelisCollection, Peli};