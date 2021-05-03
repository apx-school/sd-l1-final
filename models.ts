import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[]
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
    this.data = json    
      return json;
    });
  }
  getById(id:number){
     return this.getAll().then((json)=>{
       return json.find((i)=>{
         return i.id == id
       })
     });
  }
  search(options:any){
    return this.getAll().then(json =>{
      let resultado = json;
      if(options.title){ 
          resultado = resultado.filter((item)=>{
            return item.title.includes(options.title) || item.title.toLocaleLowerCase().includes(options.title)
          })
         
        }
      if (options.tag){
          resultado = resultado.filter((item)=>{
            return item.tags.includes(options.tag)
          })
          
      }
      return resultado
     })
    }
   add(peli:Peli):Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli)
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