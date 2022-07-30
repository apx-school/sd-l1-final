import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json")
  };
  async getById(id: number) {
    return await this.getAll().then(respuesta => {
      return respuesta.find(idPeli => idPeli.id == id);
    })
  };
  
  async search(options: any) {
    if (options.title && options.tag) {
      const filtraTitulo = await this.getAll().then(respuesta => {
        return respuesta.filter(pelititle => pelititle.title.includes(options.title));
      })
      return filtraTitulo.filter(pelititle => {
        if (pelititle.tags.includes(options.tag)) {
            return pelititle
        }
      })
    
    } else if (options.title) {
      return await this.getAll().then(respuesta => {
        return respuesta.filter(pelititle => pelititle.title.includes(options.title))
      })
    } else if (options.tag) {
      const filtratag = await this.getAll();
      return await filtratag.filter(pelitag => {
          if (pelitag.tags.includes(options.tag)) {
            return pelitag
        }
      })
    }
  }
 
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then(res => {
          res.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", res);
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

