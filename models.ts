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


search(options:any) {
return this.getAll().then((peliculas)=>{
  if(options.title && options.tag){
    return peliculas.filter((p)=>{
      return p.title.includes(options.title) &&
      p.tags.includes(options.tag)
        });

  } else if(options.title){
    return peliculas.filter((p)=>{
      return p.title.includes(options.title)
    })


  } else if(options.tag){
    return peliculas.filter((p)=>{
      return p.tags.includes(options.tag);
    })
  }
})
};


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
