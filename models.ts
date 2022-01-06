import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}
class PelisCollection {
 
  getAll(): Promise<Peli[]> {
    return  jsonfile.readFile("./pelis.json").then((res) =>{return res});
  }

  getById(id:number):Promise<Peli>{
    return this.getAll().then((pelis: Peli[])=>{
     return pelis.find((p)=>p.id ==id)
    });
  }

  search(options: any): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((pel) => {
          return (
            pel.title.includes(options.title) && pel.tags.includes(options.tag)
          );
        });
      }

      if (options.title) {
        return pelis.filter((pel) => {
          return pel.title.includes(options.title);
        });
      }

      if (options.tag) {
       
        return pelis.filter((pel) => {
          return pel.tags.includes(options.tag);
        });
      }
    });
  }
  
  add(peli: Peli): Promise<boolean> {
    return this.getAll().then((json) => {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          json.push(peli);
          return jsonfile
            .writeFile(__dirname + "/pelis.json", json)
            .then((res) => true);
        }
      });
      return promesaUno;
    });
  }
}
export { PelisCollection, Peli };