import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json")
    .then((json) => {
      return json;
    });
  }

  getById(id:number){
    return this.getAll().then((json) => {
      const respuesta = json.find((obj) => {
        return obj.id == id 
      })
      return respuesta;    
    })
  }

  search(options:any): Promise<Peli[]>{  
    return this.getAll().then((json) =>{ 
      
      if(options.title && options.tags){
        return json.filter((obj) => {
          return obj.title.includes(options.title) && 
          obj.tags.includes(options.tags)
        })
      }
      else if(options.title){
        return json.filter((obj) => {
          return obj.title.includes(options.title)
        })
      }
      else if(options.tags){
        return json.filter((obj) => {
          return obj.tags.includes(options.tags)
        })
      }
    })
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
          const promesaDos = this.getAll().then((pelis) => {
           pelis.push(peli)
          return jsonfile.writeFile("./pelis.json", pelis)
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };