import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}


class PelisCollection {
  getAll() : Promise<Peli[]>  {
    return  jsonfile.readFile("./pelis.json").then((pelisJson) =>{
      return pelisJson;
    });
  }
getById(id:number): Promise <Peli>{
  return this.getAll().then((pelisCompletas) => {
    const idPelis = pelisCompletas.find((peli) => {
        return peli.id == id;
    });
    return idPelis;
    });
  }  
search(options:any): Promise<any>{
 return this.getAll().then((peliculas)=>{
    if(options.title && options.tag){
      return peliculas.filter((pelis)=>{
        return pelis.title.includes(options.title) && pelis.tags.includes(options.tag);    
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
 return this.getById(peli.id).then((peliExistente) =>{
if(peliExistente){
  return false;
} else {   
const promesaCorrecta = this.getAll().then((peliculas) => {
peliculas.push(peli);
return jsonfile.writeFile("./pelis.json", peliculas);
});
return promesaCorrecta.then(()=> {
  return true;
})
}
});
}
}

export { PelisCollection, Peli };


//const peliculas = new PelisCollection();
//peliculas.getById(2).then((pelisCompletas) =>{
 // console.log(pelisCompletas);
//});