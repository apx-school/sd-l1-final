import * as jsonfile from "jsonfile";
type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  rating: number;
  tags: string[];
  year: number;
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      return json
    })
  };

    add(peli: Peli): Promise<boolean> {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) { // si encuentra la pelicula devuelve false
          return false;
        } else {
          const data = jsonfile.readFileSync("./pelis.json")
          data.push(peli)
          return jsonfile.writeFile("./pelis.json", data).then(() => { // Escribe en el json y devuelve true
            return true;
          });
        }
      });
      return promesaUno;
    }
    // METODO GETBYID
    getById(id:number):Promise<Peli>{
      return this.getAll().then((peliculas)=>{return peliculas.find((p)=>p.id == id)})
    }
    async search(options:SearchOptions){
      const lista = await this.getAll();

      const listaFiltrada = lista.filter((p)=>{
        let esteVa = false;
        if (options.tag){
          //logica de tags
          //si pasa cambio la flag a true
          esteVa = p.tags.includes(options.tag.toLowerCase())
        }
        if (options.title) {
          esteVa = p.title.includes(options.title.toLowerCase())
        }
        return esteVa
      })
      return listaFiltrada
    }
}
export { PelisCollection, Peli };