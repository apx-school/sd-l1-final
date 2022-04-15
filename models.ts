import * as jsonfile from "jsonfile";
import * as _ from "lodash";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data:Peli[] = [];
  getAll(): Promise<any> {
    const promesa = jsonfile.readFile("./pelis.json")
    promesa.then((data) =>{
      this.data = data;
    })
    return promesa;
  }

  getById(id:number):Promise<Peli> {
    return this.getAll().then((pelis)=>{
      return _.find(pelis,(p)=>{ return p.id == id;})
    })
  }
  
  search(options:any):Promise<Peli[]> {
    return this.getAll().then((pelis)=>{

      let encontrada = pelis;

      if(options.title){
        encontrada = _.filter(encontrada, (p)=>{
          return _.includes(p.title, options.title);
        });
      }

      if (options.tag) {
        encontrada = _.filter(encontrada, (p)=>{
          return _.includes(p.tags, options.tag);
        });
      }
      return encontrada;
    })
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
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
