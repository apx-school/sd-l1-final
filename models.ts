import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
  }

  getById(id:number): Promise<Peli>{
    return this.getAll().then((p)=>{
      const encontrado = p.find((peli)=>{
        return peli.id == id;
      })
      return encontrado;
    })
  }

  search(options:any): Promise<Peli[]>{
    return this.getAll().then((p)=>{
      var resultado = p;
      // if(options.title & options.tag){
      //   resultado = resultado.filter((p)=>{
      //     return p.title.includes(options.title) && p.tags.includes(options.tag);})
      // }
      if(options.title){
      resultado = resultado.filter((p)=>{
          return p.title.includes(options.title);})
      } 
      if(options.tag){

        resultado = resultado.filter((p)=>{
          return p.tags.includes(options.tag);})
        } 
        
        return resultado
  })
}


  add(peli: Peli): Promise<boolean> {
  const promesa = this.getById(peli.id).then((peliExistente) => {
    if (peliExistente) {
      return false;
    } else {
      // magia que agrega la pelicula a un objeto data
      return this.getAll().then((peliculas)=> {
        peliculas.push(peli);
        jsonfile.writeFile("./pelis.json", peliculas);
        return true;
      });

    }
  });

  return promesa;
}
}


export { PelisCollection, Peli };
