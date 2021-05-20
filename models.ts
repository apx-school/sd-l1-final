import * as jsonfile from "jsonfile";
import { find, includes } from "lodash";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((r) => {
      return this.data = r;
    });
  }

  getById(id:number):Promise<any>{
    const promesa = this.getAll().then(()=>{
       return find(this.data, (peli) => {
        return peli.id == id
      });
     });
     return promesa;
  }

  search(options:any):Promise<any>{
    return this.getAll().then((r)=>{
      let res = r;
      if(options.title){
        res = res.filter((i)=> includes(i.title, options.title));
      }
      if(options.tag){
        res = res.filter((i)=> includes(i.tags, options.tag));
      }
      return res;
    });
  }

  add(peli:Peli): Promise<boolean> {
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
