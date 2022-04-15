import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
};

class PelisCollection {
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      return peliculas;
    });
  };

  getById(id:number){
    return this.getAll().then((peliculas) => {
    const movies = peliculas.find((p) => {
      return p.id == id
    });
    return movies
  })};

  search (options: any) : Promise <any>{
    return this.getAll().then((peliculas) =>{
      if (options.title && options.tag){
        return peliculas.filter((p) =>{
          return p.title.includes(options.title) &&
          p.tags.includes(options.tag)
        });
      } 
      else if (options.title){
        return peliculas.filter((p) => {
          return p.title.includes(options.title)
        });
      }
      else if (options.tag){
        return peliculas.filter((p) => {
          return p.tags.includes(options.tag)
        });
      };
    });
  };

  add(peli: Peli) : Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((exist) =>{
      if (exist){
        return false
      } else {
        const promesaDos = this.getAll().then((peliculas) =>{ 
          peliculas.push(peli)
          return jsonfile.writeFile("./pelis.json", peliculas);
         });
         return promesaDos.then(() =>{
           return true
         });
      };
    });

    return promesaUno
  };
};

export { PelisCollection, Peli };