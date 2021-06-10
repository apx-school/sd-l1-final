import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  title: string;
  id: number;
  tag: string[];
}

class PelisCollection {
  peliculas: Peli[];

  getAll(): Promise<Peli[]> {
      const todasLasPelis = jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });return todasLasPelis;
  }


  getById(id: number): Promise<Peli> {
    return this.getAll().then((listaPelis) => {
      return listaPelis.find((item) => {
        return item.id == id;
      });
    });
  }

  
  search(options: any): Promise<Peli[]> {
    return this.getAll().then((listaPelis) => {
      if (options.title && options.tag){
        return listaPelis.filter((item)=>{
          return item.title.includes(options.title) && item.tag.includes(options.tag);
        });
      }
      if (options.title) {
        return listaPelis.filter((item) => {
          return item.title.includes(options.title);
        });
      }
      if (options.tag) {
        return listaPelis.filter((item) => {
          return item.tag.includes(options.tag);
        });
      }
    });
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

// const todasLasPelis = peliNueva.getAll().then ((p)=>{
//   console.table(p);
//   return p;
// });
// console.table(todasLasPelis)

// const peliEncontrada = peliNueva.getById(6).then((p)=> {
//   console.table(p);
//   return p;
// })
// console.log (peliEncontrada);

// peliNueva.add({title: "el señor de los anillos",id: 14,
// tag: ["adolescente", "acción", "ciencia ficción"]
// });
// peliNueva.getAll().then((p)=>{
//   console.table(p);
//   return p;
// })

// const peliEncontrada = peliNueva.search({tag:"terror"}).then((p)=>{
//   console.table(p);
//   return p;

// })





export {PelisCollection, Peli};