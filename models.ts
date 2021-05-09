import * as jsonfile from "jsonfile";
import { includes, find } from "lodash";


class Peli {

  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data) => {
      return this.data = data;
    });
  }
  getById(id:number): Promise<any>{
    return this.getAll().then(() => {
      return find(this.data, (item) => {
       return item.id == id})

       
    })
  }
  search(options: any): Promise<Peli[]> {
    return this.getAll().then((p) => {
      let respuesta = p;
      if (options.title) {
        respuesta = respuesta.filter((c) => includes(c.title, options.title));
      }
      if (options.tag) {
        respuesta = respuesta.filter((c) => includes(c.tags, options.tag));
      }

      return respuesta;
    });
     
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





