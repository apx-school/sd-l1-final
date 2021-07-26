import * as jsonfile from "jsonfile";
import * as lodash from "lodash";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  arrayPelis:Peli[];
  getAll(): Promise<Peli[]> {
    const todasLasPelis = jsonfile.readFile("./pelis.json").then((resultado) => {
      return this.arrayPelis = resultado;
    });
    return todasLasPelis;
  }
  getById(id:number){
    return this.getAll().then((peliId)=>{
     const peliculaEncontrada = peliId.find((peliculaId)=>{
        return peliculaId.id == id;
      })
      return peliculaEncontrada;
    })
  }
  search(options:any){
    
    if (options.search && options.tag){
      this.getAll().then((peliTagYSerch)=>{
        const parametrosEncontrados = peliTagYSerch.find((peliEncontrada)=>{
          return peliEncontrada.title.includes(options.search) && peliEncontrada.tags.includes(options.tag);
        })
        
      return parametrosEncontrados;
      })
    }else if (options.search){
      this.getAll().then((peliSerch)=>{
        const parametroEncontrado = peliSerch.find((peliEncontrada)=>{
          console.log("estoy entrando aca")
          return peliEncontrada.title.includes(options.search);})
      return parametroEncontrado;
    })
    }else if(options.tag){
      this.getAll().then((peliSerch)=>{
        const parametroTagEncontrado = peliSerch.find((peliEncontrada)=>{
          return peliEncontrada.tags.includes(options.tag);})
      return parametroTagEncontrado;
     })}

  }
  //add(peli:Peli){

  //}
}
export { PelisCollection, Peli };












const peli = new PelisCollection();
const resultado = peli.getAll().then((i)=>{
  return lodash.find(i,{id:1});
  
});
console.log(resultado)
















//const peli2 = new PelisCollection();
//peli2.getById(4).then((resultado)=>{
//  console.log(resultado)})
   