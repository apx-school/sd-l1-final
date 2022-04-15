import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(){
    const promise =jsonfile.readFile("./pelis.json").then((pelis) =>{
      this.data = pelis;
      return pelis;
    });
    return promise;
  }
  getById(id:number){
    const promise = this.getAll().then(()=>{
       return this.data.find((item) => item.id == id);
    });
    return promise;
  }

  search(options:any){
  const promise = this.getAll().then((array) =>{
    var resultadoFinal;
      if(options.title){
        resultadoFinal = array.filter((item) => item.title.includes(options.title));
      }
      if(options.tag){
        resultadoFinal = array.filter((item) => item.tags.includes(options.tag));
      }
      if(options.tag && options.title){
        resultadoFinal = array.filter((item) => 
        (item.tags.includes(options.tag) && item.title.includes(options.title)));  
      }
    return resultadoFinal;
  });
 return promise;
}

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) =>{
      if (peliExistente) {
        return false;
      } else {
          this.data.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", this.data);
          return promesaDos.then(() => {
            return true;
        });
      }
    });
    return promesaUno;
  } 
}



export { PelisCollection, Peli };

