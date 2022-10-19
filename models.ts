import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[]
  async getAll(){
    const todasLasPelis = await jsonfile.readFile( __dirname + "/pelis.json")
    return (this.peliculas = todasLasPelis);
  }

  async getById(id:number){
    await this.getAll()
    const respuesta= this.peliculas.find((pelis) => {return pelis.id == id})
    return respuesta
  }

  async search(options:any){
    await this.getAll()
    if (options.title && options.tag){
        return await this.peliculas.filter((peli)=>{
            return (peli.title.includes(options.title) && peli.tags.includes(options.tag))
        })
    }
    if (options.title){
        return await this.peliculas.filter((peli) =>{
            return peli.title.includes(options.title)
        })
    }
    if (options.tag){
        return await this.peliculas.filter((peli)=>{
            return peli.tags.includes(options.tag)
        })
    }
}

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((x)=>{
          x.push(peli);
          const promesaDos = jsonfile.writeFile( __dirname + "/pelis.json", x);
          return promesaDos.then(() => {
            return true;
          });
        })
      }
    });
    return promesaUno
  }
}

  export { PelisCollection, Peli };
