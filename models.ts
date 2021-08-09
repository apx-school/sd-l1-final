import * as jsonfile from "jsonfile";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas:Peli[]
 getAll():Promise<Peli[]>{
   const promesa= jsonfile.readFile("pelis.json").then((res)=>{return res})
   return promesa;
 }
 getById(id:number):Promise<Peli>{
   const promesa1= this.getAll().then((pelis)=>{
     const peliEncontrada= pelis.find((p)=>{if(p.id==id){return p}})
     return peliEncontrada;
   })
   return promesa1;
 } 
 search(options:any):Promise<any>{
   return this.getAll().then((resp)=>{
     var resultado = resp;
    if(options.title){
     resultado= resultado.filter((pelis)=>{return pelis.title.includes(options.title)})
    }
    if(options.tag){
      resultado= resultado.filter((pelis)=>{return pelis.tags.includes(options.tags)})
     }

     return resultado;
   })
   
 }
 add(peli:Peli):Promise<boolean>{
  return this.getById(peli.id).then((peliExistente) => {
    if (peliExistente) {
      return false;
      console.log(" ya existe esa pelicula");
    } else {
    
    return this.getAll().then((pelis)=> {
      pelis.push(peli);
    
    return jsonfile.writeFile("./pelis.json", pelis);
    });return true;
    }

  });
  

}

}

 
export{Peli, PelisCollection}
  
  

