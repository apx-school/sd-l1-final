import * as jsonfile from "jsonfile";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}


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
  return this.getAll().then((pelic)=>{

    var respuesta = pelic;

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
  return this.getById(peli.id).then((peliRepetida) => {
    if (peliRepetida) {
      return false;
      
    } else {
    
    return this.getAll().then((pelis)=> {
      pelis.push(peli);
    
    return jsonfile.writeFile("./pelis.json", pelis);
    });return true
    }
  });

}

};



export { PelisCollection, Peli };

