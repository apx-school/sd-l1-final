import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
};

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((archivo) => {
      // la respuesta de la promesa
    return archivo;
    });
  };
  getById(id:number): Promise<any>{
    return this.getAll().then((pelis) => {const encontrado = pelis.find((res) => {
    return res.id == id;
      });
    return encontrado;
    });
  };
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
};
  add(peli:Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente)=>{
      if(peliExistente){
        return false;
      } else{
        return this.getAll().then((res)=>{
          const data = res;
          res.push(peli)
        const promesaDos = jsonfile.writeFile("./pelis.json", data)
        return promesaDos.then(()=>{
          return true;
        });
      });
    };
      });
    
    return promesaUno;
  };
};
 

export { PelisCollection, Peli };

 
