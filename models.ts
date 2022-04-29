import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data) => data);
  }
  getById(id:number): Promise<Peli>{
    return this.getAll().then((coll)=>{
      const resultado = coll.find((c)=>{
        return c.id == id
      })
      return resultado
    })
  }
  async search(options:any):Promise<any>{
    const peliculas = await this.getAll();
    if (options.title && options.tag) {
      return peliculas.filter((obj) => {
        const tagsAndTitles = obj.tags.find(res =>
           res == options.tag && obj.title.includes(options.title)
        )
        return tagsAndTitles
      })
    }
    else if(options.title){
      const titles = peliculas.filter(coll => {
        return coll.title.includes(options.title)
      })
      return titles
    }
    else if (options.tag) {
      return peliculas.filter((coll) => {
        const filtradoPorTags = coll.tags.find(res =>
           res == options.tag);
        return filtradoPorTags;
        });
    }
    return peliculas
  }
 async add(peli:Peli):Promise<boolean>{
    const promesaUno = await this.getById(peli.id).then(async peliExistente =>{
      if(peliExistente){
        return false
      }
      else{
        const data = await this.getAll()
        data.push(peli)
        const promesaDos = jsonfile.writeFile("./pelis.json", data)
          return promesaDos.then(()=>{
            return true
          })
      }
    })
    return promesaUno
  }
}
export { PelisCollection, Peli };