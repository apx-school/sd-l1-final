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
            return peliculas;
    });
  }
  getById(id:number){
    return this.getAll().then((peliculas)=>{
      const resultado = peliculas.find((item)=>{
        return item.id == id
      }) 
    return resultado})
  }
  search(options: any){
    return this.getAll().then((pelis)=>{
      if (options.title && options.tag) {
        return pelis.filter((peli)=>{
          return peli.title.includes(options.title) &&
          peli.tags.includes(options.tag)
        })
      } else if (options.title) {
        return pelis.filter((peli)=>{
          return peli.title.includes(options.title)
        })
      } else if (options.tag) {
        return pelis.filter((peli)=>{
          return peli.tags.includes(options.tag)
        })
      }         
    })
  }
  add(peli: Peli): Promise<boolean>{
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis).then(() => {
            return true;
          });
        });
      }
    });
  }
}




export { PelisCollection, Peli };
