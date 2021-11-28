import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
  rating?: number;
  year?: number;
}

// class Options {
//   title?:string;
//   tag?: string;
// }

class PelisCollection {
  
  constructor(){}

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data) => {
      // la respuesta de la promesa
      return data;
    });
  }

  getById(id:number): Promise<Peli>{
    return this.getAll().then(data => {
      return data.find(peli => peli.id === id);
    })
  }

  search(options:any):Promise<Peli[]>{
      return this.getAll().then(data => {
        if(options.title){
          return data.filter(peli => peli.title.includes(options.title));
        } else if (options.tag){
          return data.filter(peli => peli.tags.includes(options.tag));
        }
      })
  }

  add(peli:Peli):Promise<boolean>{
      
      const promesaUno = this.getById(peli.id).then(pelicula => {
        if(pelicula){
          return false;
        } else {
          return this.getAll().then(
            pelis => {
              let data: Peli[] = [];
              data = [...pelis, peli];
              const promesaDos = jsonfile.writeFile("./pelis.json", data);
              return promesaDos.then(() => {
                return true;
              }).catch(error => {
                return false
              });
            }
          )
        }
      })

      return promesaUno;
  }
}

export { PelisCollection, Peli };