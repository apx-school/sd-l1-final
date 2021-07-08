import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll() {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
  }
  getById(id:number){
    const peliBuscada = this.getAll().then((pelis) =>
      pelis.find((item) => item.id == id)
    );
    return peliBuscada;
  }
  search(options:any){
    return this.getAll().then((pelis) =>{
      if (options.title && options.tag){
        return pelis.filter((item)=> {
          return item.title.includes(options.title) && item.tags.includes(options.tag);
        });
      }else if(options.title){
        return pelis.filter((item) =>{
          return item.title.includes(options.title);
        });
      }else if(options.tag){
        return pelis.filter((item) =>{
          return item.tags.includes(options.tag);
        });
      }
    });
  }
  
  add(peli:Peli): Promise <boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if(peliExistente){
        return false;
      }else{
        const promesaDos = this.getAll().then((data) => {
          data.push(peli);
          return jsonfile.writeFile("./pelis.json", data);
        });
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
