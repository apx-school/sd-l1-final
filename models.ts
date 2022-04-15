import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      // la respuesta de la promesa
    
      return (this.pelis = json);
    });
  }
  
  getById(id): Promise<Peli>{
    return this.getAll().then((i)=>{
    const resultado =  i.find((i)=>{
        return i.id == id;

      });
      return resultado;

    });
      
  }

  search(options:any): Promise<any> {
    return this.getAll().then((a)=>{
      if(options.title && options.tag){
        return a.filter((pelis)=> { return pelis.title.includes(options.title) && pelis.tags.includes(options.tag)});
   
      
   } else if(options.title){
    return a.filter((pelis) => { return pelis.title.includes(options.title);
      
    });
  } else if(options.tag){
      return a.filter((pelis)=> { return pelis.tags.includes(options.tag);
        
      });
    };
  });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        
        const promesaDos = this.getAll().then((pelis)=>{
            pelis.push(peli)
            return  jsonfile.writeFile("./pelis.json", pelis);
        }); 
            return promesaDos.then(() => {
             return true;
        });
      }
    });

    return promesaUno;
  }

}
export { PelisCollection, Peli };
