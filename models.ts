import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = []
  getAll(): Promise<Peli[]> {
    return  jsonfile.readFile("./pelis.json").then((res) => {
      this.pelis = res
      return res
    });
  }
  getById(id:number){
    return this.getAll().then((res)=>{
      return res.find((item)=>{
        return item.id === id
      })
    })
  }
  search(options:any){
    return this.getAll().then((res)=>{
    let peliculas = res
      if(options.title) {
        peliculas = peliculas.filter((item)=>{
          return item.title.includes(options.title)
        })
      }
      if (options.tag) {
        peliculas = peliculas.filter((item)=>{
          return item.tags.includes(options.tag)
        })
      }
      return peliculas
    })
  }
  add(peli:Peli):Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        this.pelis.push(peli)
        const promesaDos = jsonfile.writeFile("./pelis.json", this.pelis);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}
/*const objecto = new PelisCollection()
objecto.search({title:"halcon"}).then((p)=>{
  console.log(p)
})*/

export { PelisCollection, Peli };
 