import * as jsonfile from "jsonfile";
// sumo este import solo para que tsc lo tome y lo copie
// en la app no usamos esto para acceder al archivo porque es dinámico
import "./pelis.json";




type SearchOptions = { title?: string; tag?: string };
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[]
  constructor(){
    this.pelis = []
  }
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./src/pelis.json").then((peliculasJSON) => {
        try {
          return peliculasJSON
        } catch (error) {
          console.error("Error al leer el archivo")
          return []
        }
    });}
    getById(id: number): Promise<Peli | undefined> {
      return this.getAll().then((peliculas) => {
        return peliculas.find((peli) => peli.id === id);
      });
    }
    
    add(peli: Peli): Promise<boolean> {
      // Verificar si la película ya existe
      return this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          // La película ya existe, devuelve false
          return false;
        } else {
          // La película no existe, agrega la nueva película
          return this.getAll().then((peliculas) => {
            peliculas.push(peli);
            
            // Guarda la lista actualizada en el archivo
            const data = peliculas;
            return jsonfile.writeFile("./src/pelis.json", data).then(() => {
              return true; // Devuelve true indicando que la película fue agregada con éxito
            });
          });
        }
      });
    }
    async search(options: SearchOptions): Promise<Peli[]> {
      const lista = await this.getAll();
    
      const listaFiltrada = lista.filter((p) => {
        let esteVa = false;
    
        if (options.tag && p.tags.includes(options.tag)) {
          esteVa = true;
        }
    
        if (options.title && p.title.includes(options.title)) {
          esteVa = true;
        }
    
        return esteVa;
      });
    
      return listaFiltrada;
    }
    


}
export { PelisCollection, Peli };