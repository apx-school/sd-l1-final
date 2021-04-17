import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  listaDePelis: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile
      .readFile("./pelis.json")
      .then((res) => {
        return this.listaDePelis = res;
      })
      .catch((getError) => {
        console.log("Error del get", getError);
        return getError;
      });
  }
  getById(id: Number) {
    let promesaId = this.getAll()
      .then(() => {
        return this.listaDePelis.find((j) => j.id == id);
      })
      
      .catch((d) => {
        console.log("error del add", d);
        return d;
      });

    return promesaId;
  }

  search(options:any):Promise<Peli[]> {
   
    let promesaSearch = this.getAll()
      .then(() => {
        let nuevaListaDePelis = this.listaDePelis;

        for (const key in options) {
          if (key == "title") {
            nuevaListaDePelis = nuevaListaDePelis.filter(function (pelicula) {
              if (pelicula.title.search(options.title) >= 0) {
                return true;
              }
            });
          }
          if (key == "tag") {
            nuevaListaDePelis = nuevaListaDePelis.filter(n => {
              
           return   n.tags.includes(options[key]);
            
              
            
          });
              
      
         }
        } 
         return nuevaListaDePelis;
        })
      .catch((n) => {
        console.error(n);
        return n;
      });

    return promesaSearch;
  }

  add(peli: Peli):Promise<Peli[]> {
    let promesaDeAdd = this.getAll()
      .then(() => {
        let encontrado = this.listaDePelis.find((n) => n.id == peli.id);

        if (encontrado == undefined) {
          this.listaDePelis.push(peli);
          return jsonfile
            .writeFile("./pelis.json", this.listaDePelis)
            .then(() => {
              return true;
            });
        }
        if (encontrado != undefined) {
          return false;
        }
      })
      .catch((n) => {
        console.log("error al añadir", n);
        return n;
      });

    return promesaDeAdd;
  }
}
export { PelisCollection, Peli };
