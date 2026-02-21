import { error } from "console";
import * as jsonfile from "jsonfile";
import * as path from "path";
const filePath = path.resolve(__dirname, "../pelis.json");
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(filePath).then((data) => {
    const pelis = data;
    console.log(pelis);
      return pelis;
    });
  }
  add(peli: Peli): Promise<boolean> {
  return this.getById(peli.id).then((peliExistente) => {

    if (peliExistente) {
      return false;
    }
      return jsonfile.readFile(filePath).then((pelisArray) => {
        pelisArray.push(peli);
        return jsonfile.writeFile(filePath, pelisArray);
      }).then(() => {
        return true;
      }).catch(() => false);
    

  });
}

 getById(id:number):Promise<Peli> {
    return this.getAll().then((pelis) => {
     const ident = pelis.find((peli) => peli.id == id);
     if (!ident) {
      console.error(error);
     }
     return ident;
     });
  }
  search(options:SearchOptions):Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      return pelis.filter((p) => {
        let cumple = true;
        if (options.tag) {
          cumple = cumple && p.tags.includes(options.tag);
        }
        if (options.title) {
          cumple = cumple && p.title.includes(options.title);
        }
        return cumple;
      });
  });
  
}
}
export { PelisCollection, Peli };
