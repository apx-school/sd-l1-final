import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}


class PelisCollection {
  getAll() : Promise<any>  {
    return  jsonfile.readFile("./pelis.json").then((pelisJson) =>{
      return pelisJson;
    });
  }
getById(id:number){
  return this.getAll().then((pelisCompletas) => {
    const idPelis = pelisCompletas.find((peli) => {
        return peli.id == id;
    });
    return idPelis;
    });
  }  
search(options:any){
 return this.getAll().then((peliculas)=>{
    if(options.title && options.tag){
      return peliculas.filter((objPelis)=>{
        return objPelis.title.includes(options.title) && objPelis.tags.includes(options.tag);    
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
const promesaDos = this.getAll().then((peliculas) =>{
peliculas.push(peli);
return jsonfile.writeFile("./pelis.json", peliculas);
 });
 return promesaDos.then(()=>{
   return true;
 });
}
});
return promesaUno;
 }
}


export { PelisCollection, Peli };


//const peliculas = new PelisCollection();
//peliculas.getById(70).then((pelisCompletas) =>{
//  console.log(pelisCompletas);
//});