import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      
      return pelis;
    });
  }

  getById(id:number): Promise<Peli> {
    return this.getAll().then((pelis)=>{
      const resultado = pelis.find((peli) => {
        return peli.id == id;
      });
      return resultado;
    });
  }

  search(options:any): Promise<any> {
    return this.getAll().then((peliculas) => {
      if(options.title && options.tag){
        const resultadoTitle = peliculas.filter((pelis) => pelis.title.includes(options.title));
        return resultadoTitle.filter((peli) => peli.tags.find(t => t == options.tag));
      } else if(options.title){
          const resultadoTitle = peliculas.filter((pelis) => pelis.title.includes(options.title));
            return resultadoTitle;
      } else if (options.tag) {
          const resultadoTags = peliculas.filter((pelis) => pelis.tags.find(t => t == options.tag));
            return resultadoTags;
        }
      });
    }

    add(peli:Peli): Promise<boolean> {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
            return this.getAll().then((peliculas) => {
            const data = peliculas;
            peliculas.push(peli);
            const promesaDos = jsonfile.writeFile("./pelis.json", data);
            return promesaDos.then(() => {
              return true;
            });
          })
        }
      });
  
      return promesaUno;
    }
    
  }


export { PelisCollection, Peli };
