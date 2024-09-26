import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];

}
type SearchOptions = { title?: string; tag?: string };
class PelisCollection {
  

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {console.log(pelis)
      // la respuesta de la promesa
      return pelis;
    })
    .catch((error)=>{
      console.log("Ocurrió un error", error);
      return []
    });
  }
 async add(peli: Peli): Promise<boolean> {
  const peliExistente = await this.getById(peli.id) 
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = await this.getAll() 
        data.push(peli)
        await jsonfile.writeFile("./pelis.json", data)
        return true
        ;
      }
    };
  
 async  getById(id:number) {
  const todasLasPelis = await this.getAll()
  const peliEncontrada = todasLasPelis.find((peli)=>peli.id === id);
  return peliEncontrada
 }
 async search(options) {
  const lista = await this.getAll();

  const listraFiltrada = lista.filter((peli)=> {
    let esteVa = false;
    if (options.tag) {
      esteVa = peli.tags.includes(options.tag)
      // lógica de tags
      // si pasa cambio "esteVa" a true

    }
    if (options.title) {
      esteVa = peli.title.includes(options.title)
      return esteVa
      // lógica de title
      // si pasa cambio "esteVa" a true
    }
    return listraFiltrada;
  });

  return listraFiltrada;
}
 }
export { PelisCollection, Peli };
