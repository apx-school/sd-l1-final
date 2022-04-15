import * as jsonfile from "jsonfile";



// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
 peliculas: Peli[]  //tomamos la estructura base
  getAll(): Promise<any[]> {
    const leerPelis= jsonfile.readFile("./pelis.json").then((i) => {
      return(this.peliculas = i) //devuelve todas las peliculas
    });
    return leerPelis; 
  }

  getById(id:number){
   const porId = this.getAll().then((peliculas)=>{return peliculas.find((i)=>{return(i.id === id)})})
   return porId; // devuelve peliculas por ID 
  }

  search(options:any){
  return this.getAll().then((pelis)=>{return pelis.filter((peliculax)=>{ //recibe el objeto y FILTRA SEGUN LAS PROPIEDADES
    if(options.title && options.tag){ //propiedades (options + "propiedad title && propiedad tag")
      return (peliculax.title.includes(options.title) && //pelicula en la posicion TITULO incluye option.title
      peliculax.tags.includes(options.tag.toString()));  //pelicula en la posicion tag incluye option.tag
    }
    else if (options.title){return peliculax.title.includes(options.title)} //instancio cada clase 1 x 1 
    else if(options.tag){return peliculax.tags.includes(options.tag.toString())}
    else{return this.getAll()} // si no paso parametros devuelve TODO
  })
    })
  
  
  }
   add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
          return false;
      } else {
          this.peliculas.push(peli);
          const data = this.peliculas;
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