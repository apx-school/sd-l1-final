import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  title: string;
  id: number;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
  getAll(): Promise<Peli[]> {
      const todasLasPelis = jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });return todasLasPelis;
  }

  getById(id: number) {
    return this.getAll().then((peliculas) => {
      return peliculas.find((i) => {
        return i.id == id;
      });
    });
  }

  search(options: any): Promise<any> {
      if (options.title && options.tag){
        return this.getAll().then((listaPelis) => {
        const peliFiltrada = listaPelis.filter((item)=>{
          return item.title.includes(options.title) && item.tags.includes(options.tag);
        }); return peliEncontrada;
        })
      }
      else if (options.title) {
        return this.getAll().then((listaPelis) => {
          const peliTituloFiltrado = listaPelis.filter((item)=>{
            return item.title.includes(options.title);
          });return peliTituloFiltrado;
          }) 
      } else if (options.tags) {
        return this.getAll().then((listaPelis) => {
          const peliTagsFiltrado = listaPelis.filter((item)=>{
            return item.tags.includes(options.tags);
          });return peliTagsFiltrado;
          }) 
      }
  
  }
     

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((idRepetido) => {
      if (idRepetido) {
        return false;
      } else {
        return this.getAll().then((lista) => {
          lista.push(peli);
          return jsonfile.writeFile("./pelis.json", lista).then(() => {
            return true;
          });
        });
      }
    });
  }
}


const peliNueva = new PelisCollection;
// const peliEncontrada = peliNueva.getById(11).then((p)=> {
//   console.log(p);
//   return p;
// })
// console.log (peliEncontrada);

// peliNueva.add({title: "ET",id: 13,
// tags: ["Humor", "Niños", "Ciencia Ficción"]
// });
// const todasLasPelis = peliNueva.getAll().then((p)=>{
//   console.table(p);
//   return p;


const peliEncontrada = peliNueva.search({tags:"accion" })
console.table(peliEncontrada);




export { PelisCollection, Peli };