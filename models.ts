import * as jsonfile from "jsonfile";
import { includes } from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis2.json")
      .then((p) => {
        return p;
      });
  }
  getById(id: number): Promise<Peli>{
    return jsonfile.readFile("./pelis2.json")
      .then((p) => {
        return p.find((c) => c.id == id)
      })
  }
  search(options: any): Promise<Peli[]>{
    if (options.title && options.tag) {
      return jsonfile.readFile("./pelis2.json")
        .then((p) => {
          var resp;
          resp = p.filter((c) => includes(c.title, options.title))
          return resp = resp.filter((c) => includes(c.tags, options.tag))
        })
    }
    else if (options.title){
      return jsonfile.readFile("./pelis2.json")
        .then((p) => {
          return p.filter((c) => includes(c.title, options.title))
        });
    }
    else if (options.tag){
      return jsonfile.readFile("./pelis2.json")
        .then((p) => {
          return p.filter((c) => includes(c.tags, options.tag))
        });
    }
  }
  add(peli: Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = jsonfile.readFile("./pelis2.json");
        data.then((d) => {
          const data = d.concat(peli);
          const promesaDos = jsonfile.writeFile("./pelis2.json", data)
            .then(() => {
            return true;
            });
            return promesaDos;
        });
        return true;
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };

// function pruebas (){
//   //nueva collection
//   const col = new PelisCollection;

  // //pruebas de .getAll
  // const promesa = col.getAll();
  // promesa.then((p)=>
  //   console.table(p)
  // )

  // //pruebas de .getById
  // const getbyid = col.getById(1)
  // getbyid.then((p)=>{
  //   if (p) {
  //     console.table(p)
  //   }
  //   else {
  //     console.log("No coincide ninguna id")
  //   }
    
  // })

  // pruebas de .search
  // const opt = {
  //   title: "i",
  //   tag: "amor"
  // }
  // const prom = col.search(opt)
  // prom.then((p) => console.table(p))

  // //pruebas de .add
  // const peli = new Peli;
  // peli.id = 4;
  // peli.title = "La isla siniestra"
  // peli.tags = ["accion"];
  // col.add(peli).then((p) => console.log(p));
// }

// pruebas();