import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return [pelis];
    });
  };
  getById(id:number){
    return this.getAll().then((peli)=>{
      const resultado = peli.find((movie)=>{
        return movie.id == id
      })
      return resultado
    })
  }
}
export { PelisCollection, Peli };


//instancias de prueba
const peliDePrueba = new PelisCollection;
// peliDePrueba.getAll().then((peli)=>{
//   console.log(peli)
// });
peliDePrueba.getById(1).then((peli)=>{
  console.log(peli)
})