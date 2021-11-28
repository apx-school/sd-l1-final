import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  //Metodo getAll:devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas en el archivo JSON de pelis.
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((dataPelis) => {
      // la respuesta de la promesa
      return dataPelis;
    });
  }
  //Metodo getById(id:number):devuelve la peli que tenga el id que se le pase por parámetro.
  getById(id:number) {
    return this.getAll().then(peliculas => {
       const buscarxId = peliculas.find(pelis => pelis.id == id);
    return buscarxId;   
    });
  }
  //Metodo Search:(title),(tag).
  search(options:any): Promise<any> {
    return this.getAll().then((x)=>{
      if(options.title && options.tag){
        return x.filter((searchPelis)=> { return searchPelis.title.includes(options.title) && searchPelis.tags.includes(options.tag)
        });   
   }
   //Search por Title. 
   else if(options.title){
    const filtroxTitle = x.filter((searchPelis) => searchPelis.title.includes(options.title));
      return filtroxTitle;
   }
   //Search por tag.
   else if(options.tag){
      return x.filter((searchPelis)=> { return searchPelis.tags.includes(options.tag);
        
      });
    };
  });
};

  /* Metodo Add:recibe un objeto y crea una peli en base a él.*/
  add(peli:Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente)=>{
      if(peliExistente){
        return false;
      } else{
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then((addPelis)=>{
          const data = addPelis;
          addPelis.push(peli)
        const promesaDos = jsonfile.writeFile("./pelis.json", data)
        return promesaDos.then(()=>{
          return true;
        });
      });
    };
      });
    
    return promesaUno;
  };
}
export { PelisCollection, Peli };
//funcionan test localmente