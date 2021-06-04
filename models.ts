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
//metodo search 
 search(options:any){ 
 return this.getAll().then((peliculas)=>{
 return peliculas.find((collection)=>{
  if(options.title){
    return collection.title.includes(options.title)
  } else if(options.tags){
    return collection.tags.includes(options.tags);
  }else if (options.title && options.tags){ 
    return ( collection.title.includes(options.title) && collection.tags.includes(options.tags));
  }
 });
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


