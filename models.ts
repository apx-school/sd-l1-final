import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // console.log(pelis);
      return pelis;
    });
  }

  getById(id: number) {
    return this.getAll().then((peliculas) => {
      return peliculas.find((i) => {
        return i.id == id;
      });
    });
  }

  search(options: any) {
    return this.getAll().then((lasPelis) => {
      if (options.title && options.tag) {
        return lasPelis.filter((i) => {
          return (
            i.title.includes(options.title) && i.tags.includes(options.tag)
          );
        });
      }
      if (options.title) {
        return lasPelis.filter((i) => i.title.includes(options.title));
      }
      if (options.tag) {
        return lasPelis.filter((i) => i.tags.includes(options.tag));
      }
    });
  }

  add(peli:Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente)=>{
     console.log(peli)
     if(peliExistente){
       return false;
     }else{
       this.peliculas.push(peli);
       const data = this.peliculas;
       const promesaDos = jsonfile.writeFile("./pelis.json", data);
       return promesaDos.then(()=>{
         return true;
       });
     }
   });
   return promesaUno;
  }
}



export { PelisCollection, Peli };