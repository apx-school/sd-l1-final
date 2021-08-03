import * as jsonfile from "jsonfile";
import * as _ from "lodash";
import { profileEnd } from "node:console";

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
        this.data = this.data.filter((peli) => {return peli.title.includes(options.title)});
        this.data = this.data.filter((peli) => {return peli.tags.includes(options.tag)});
      }else if(options.title){
        this.data = this.data.filter((peli) => {return peli.title.includes(options.title)})
      }else if(options.tag){
        this.data = this.data.filter((peli) => {return peli.tags.includes(options.tag)})
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

//const prueba = new PelisCollection();
//const option = {tags:["alfa", "familia"]}
//const nuevaPeli:Peli = {id: 666, title: "Eragon", tags: ["basura", "adaptación", "Fiasco"]}
//prueba.getAll().then(() => {console.log(prueba.data)});
//prueba.getById(3).then((resultado) => {console.log(resultado)})
//prueba.search(option).then(() => {console.log(prueba.data)});
//prueba.add(nuevaPeli).then(()=>console.log(prueba.data))
