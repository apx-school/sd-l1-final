import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
};


class PelisCollection {

  pelis:Peli[];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return this.pelis = pelis
    });
  };


  getById(id:number) {
      return this.getAll().then((pelis)=>{
      return pelis.find((peli)=>{
        return peli.id == id;
      });
    }) ;
  };


search(options:any): Promise<any>{
  return this.getAll().then((peliculas)=>{

    var respuesta = peliculas;

    if(options.title){
      respuesta = respuesta.filter((peli)=>{
        return peli.title.includes(options.title);
      })
    };
    if(options.tag){
      respuesta = respuesta.filter((peli)=>{
        return peli.tags.includes(options.tag)
      })
    }
    return respuesta;
  })

}


add(peli:Peli): Promise<boolean> {
  return this.getById(peli.id).then((peliExistente) => {
    if (peliExistente) {
      return false;
      console.log("La pelicula que intenta agregar ya existe");
    } else {
    
    return this.getAll().then((peliculas)=> {
      peliculas.push(peli);
    
    return jsonfile.writeFile("./pelis.json", peliculas);
    });
    }
  });

}

};



export { PelisCollection, Peli };
