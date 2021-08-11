import * as jsonfile from "jsonfile";
import * as _ from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  getAll(){
    return jsonfile.readFile("./pelis.json")
    .then((pelis) => {
      this.data = pelis;
      return pelis})
  };
  getById(id:number){
    return this.getAll().then(() => {
      const resultado = this.data.find((peli) => { 
        return peli.id == id;
      });
      return resultado;
    });
    };
  search(options:any) {
    return this.getAll().then(() => {
      if(options.title && options.tag){
        this.data = this.data.filter((peli) => {return peli.title.includes(options.title) && _.includes(peli.tags, options.tag)});
      }else if(options.title){
        this.data = this.data.filter((peli) => {return peli.title.includes(options.title)})
      }else if(options.tag){
        this.data = this.data.filter((peli) => {return _.includes(peli.tags, options.tag)})
      }
    return this.data;
  })
  };
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) =>{
      if(peliExistente){
        return false;
      }else {
        this.data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);
        return promesaDos.then(()=>{
          return true;
        });
      }
    })
    return promesaUno;
  }
}
export { PelisCollection, Peli };