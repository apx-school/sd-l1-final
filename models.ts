import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas : Peli[] = []
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./peliculas.json").then((archivoJson) => {
      const archivoParseado = JSON.parse(archivoJson)
      // la respuesta de la promesa
      return [archivoParseado];
    });
  }

  getById(id:number){
    const idFinder = this.getAll().then((archivo) => {
      return archivo.find((pelicula) => pelicula.id == id);
    })
    return idFinder;
  };

  search(options:any){
    return this.getAll().then((archivo) => {
      var peliculas = archivo;
      if(options.title){
        const titleFinder = peliculas.filter((pelicula) => {
          if (pelicula.title.includes(options.title)){
            return titleFinder;
          }
        })
      }else if(options.tag){
        const tagFinder = peliculas.filter((p) => p.tags == options.tag)
        return tagFinder;
      }
      return peliculas
    })
  };

  add(peli:Peli){
    const primerPromesa = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false 
      } else{
        this.peliculas.push(peli);
        const segundaPromesa = jsonfile.writeFile("./peliculas.json",this.peliculas);
        return segundaPromesa.then(() =>{
          return true;
        })
      }
    })
    return primerPromesa;
  };

}
export { PelisCollection, Peli };
