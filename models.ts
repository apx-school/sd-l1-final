
import * as jsonfile from "jsonfile";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[] = [];
}

class PelisCollection {
  peliculas : Peli[] = [];

  
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((peliculasJson) => {
      return this.peliculas = peliculasJson
    });
  };

  getById(id){
    //console.log("id que llega como parámetro",id)
    return this.getAll().then((peliculas) =>{
    const res = peliculas.find((pelicula) => {
      //console.log("peliculaaaah",pelicula)
      return pelicula.id == id
    });
    return res;
  });
 } 
   
 search(options:any):Promise<any>{
   //console.log("options",options)
   return this.getAll().then((dataBase)=>{
     let result = dataBase
     if(options.title && options.tag){
       result = dataBase.filter((pelicula) => {
         return pelicula.title.includes(options.title) && pelicula.tags.includes(options.tag)
       })
     }else if(options.title){
      result = dataBase.filter((pelicula) => {
        return pelicula.title.includes(options.title)
      })
     }else if(options.tag){
      result = dataBase.filter((pelicula) => {
        return pelicula.tags.includes(options.tag)
      })
     }
     return result
   })
 };
  add (peli:Peli):Promise<boolean>{
    const primerPromesa = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false 
      }else{
        this.peliculas.push(peli);
        const segundaPromesa = jsonfile.writeFile( "./pelis.json",this.peliculas);
        return segundaPromesa.then(() =>{
          return true;
        });
      };
    });
    return primerPromesa
  };
}
export { PelisCollection, Peli};
  
/*   const objParaProbarMetodos = new PelisCollection()
  let mostrarMetodogetAll = (objParaProbarMetodos.getAll())
  mostrarMetodogetAll.then(() => {
    console.log("getAll Method",mostrarMetodogetAll);
  })     */