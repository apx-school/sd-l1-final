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
  

  add(peli: Peli): any{
    return this.getById(peli.id).then((idRepetido) => {
      if (idRepetido) {
        return false;
      } else {
        return this.getAll().then((lista) => {
          lista.push(peli);
          return jsonfile.writeFile("./pelis.json", lista).then(() => {});
        });
      }
    });
  }
}




export {PelisCollection, Peli};