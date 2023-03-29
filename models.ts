import * as jsonfile from "jsonfile";
export type SearchOptions = { title?: string; tag?: string };
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelisCollection: Peli[];
  getAll(): Promise<Peli[]> {
    const pelisMostradas = jsonfile.readFile("./pelis.json").then((pelis:Peli[]) => {
      return this.pelisCollection = pelis;
    });
    return pelisMostradas.then((res) => { return res });
  }
 
  async getById(id: number): Promise<Peli>{
   await this.getAll();
    const peliEncontrada = await this.pelisCollection.find((p) => {
      return p.id == id;
    });
   return peliEncontrada;
  }

  add(peli: Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
       return this.getAll().then(() => {
          this.pelisCollection.push(peli);
        })
        
        const promesaDos = jsonfile.writeFile("./pelis.json", this.pelisCollection);
  
        return promesaDos.then(() => {
          return true;
        });
      }
    });
  
    return promesaUno;
  }

  async search(options):Promise<any> {
    const lista = await this.getAll();
    
    const listraFiltrada = lista.filter(function (p) {
      let esteVa = false;
      if (options.tag) {
        // lógica de tags
        // si pasa cambio "esteVa" a true
        if (p.tags.includes(options.tag)) {
          return esteVa = true;
      }
      }
      else if (options.title) {
        // lógica de title
        // si pasa cambio "esteVa" a true
        if (p.title.includes(options.title)) {
          return esteVa = true;
      }
      } 
      else if (options.title && options.tag) {
        if (p.title.includes(options.title) && p.tags.includes[options.tag]) {
          return esteVa = true;
        }
      }
      return esteVa;
    });
  
    return listraFiltrada;
  }

}

  
//function main() {
  //const prueba = new PelisCollection;
  //const view = prueba.add();
  //console.log(view);
//}
  
//main();

export { PelisCollection, Peli };
