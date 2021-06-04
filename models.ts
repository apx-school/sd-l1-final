import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
   pelis: Peli[] =[];
  //Metodo getAll
  getAll(): Promise<Peli[]> {

    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      // la respuesta de la promesa
      return (this.pelis = peliculas);
    });
  }
  //metodo getById
  getById(id:number){
   
    return this.getAll().then((peliculas)=>{
    const resultado = peliculas.find ((pelis) => { 
      return pelis.id == id;

    });
    return resultado;
    });
   
}
//metodo search con ayuda de discord
search(options: any): Promise<any> {
  return this.getAll().then((pelis) => {
    var collection = pelis;
    if (options.title) {
      collection = collection.filter((peli) => {
        return peli.title.toLowerCase().includes(options.title.toString().toLowerCase());
      });
    }
    if (options.tag) {
      collection = collection.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
    }
    if (options.title && options.tag) {
      collection = collection.filter((pelis) => {
        return (
          pelis.title.toLowerCase().includes(options.title) &&
          pelis.tags.includes(options.tag)
        );
      });
    }
    return collection;
  });
}
//metodo add
add(peli: Peli): Promise<boolean> {
  const promesaUno = this.getById(peli.id).then((peliExistente) => {
    if (peliExistente) {
      return false;
    } else {
      const data = this.pelis.concat(peli)
      const promesaDos = jsonfile.writeFile("./pelis.json", data);

      return promesaDos.then(() => {
        return true;
      });
    }
  });

  return promesaUno;
}

}
export { PelisCollection, Peli };


