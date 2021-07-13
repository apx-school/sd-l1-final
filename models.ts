import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}


class PelisCollection {
  getAll(): Promise<Peli[]> {
    return  jsonfile.readFile("./pelis.json").then((pelisJson) =>{
      return pelisJson;
    });
  }
getById(id:number){
  return this.getAll().then((pelisCompletas) => {
    const idPelis = pelisCompletas.find((pelis) => {
        return pelis.id == id;
    });
    return idPelis;
    });
  }  
search(options:any){
  var resultado;
  return this.getAll().then((peliculas)=>{
    if(options.title && options.tag){
      return peliculas.filter((objPelis)=>{
       objPelis.title.includes(options.title) && objPelis.tags.includes(options.tag);
       return resultado;    
      });
    } else if(options.title){
      return peliculas.filter((pelis) =>{
        return pelis.title.includes(options.title);
    });
  } else if(options.tag){
    return peliculas.filter((pelis) =>{
      return pelis.tags.includes(options.tag);
     });
    }
  });
 }
add(peli:Peli): Promise<boolean> {
  const promesaUno = this.getById(peli.id).then((peliExistente) =>{
if(peliExistente){
  return false;
} else { 
 const data = this.getAll();
 const promesaDos = jsonfile.writeFile("./pelis.json", data);
 return promesaDos.then((data) =>{
   return true;
  });
  } 
});
return promesaUno;
 }
}
 


export { PelisCollection, Peli };


const peliculas = new PelisCollection();
peliculas.getById(70).then((pelisCompletas) =>{
  console.log(pelisCompletas);
});