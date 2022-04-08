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
  };

  getById(id: number){
    return this.getAll().then((pelis)=>{
      const resultado = pelis.find((p)=>{
        return p.id == id;
      })
      return resultado
    }) 
  };

  search(options:any){
    
    if(options.title && options.tag){
      return this.getAll().then((pelis)=>{
        const titulo = pelis.filter((i)=>{
          const elementoencontrado = i.title.search(options.title)
          return elementoencontrado != -1
        })
        const tituloTag = titulo.filter((i)=>{
          return i.tags.find((item)=>{return item == options.tag})
        })
        return tituloTag;
      })
    } else if(options.title){
      return this.getAll().then((pelis)=>{
        const titulo = pelis.filter((i)=>{
          const elementoencontrado = i.title.search(options.title)
          return elementoencontrado != -1
        })
        return titulo;
      })
    } else if(options.tag){
      return this.getAll().then((pelis)=>{
        const tag = pelis.filter((i)=>{
          return i.tags.find((item)=>{return item == options.tag})
        })
        return tag
      })
    }
  };

  add(peli:Peli):Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente)=>{
      if(peliExistente){
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        var data
        const datosIniciales = this.getAll().then((pelis)=>{
          data = pelis;          
        })

        return datosIniciales.then(()=>{
          data.push(peli) 
          const promesaDos = jsonfile.writeFile("./pelis.json", data)
          return promesaDos.then(()=> {return true} );
        })  
      }  
    });
    return promesaUno;
  };

}

export { PelisCollection, Peli };


