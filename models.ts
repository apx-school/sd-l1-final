import { readFile, writeFile } from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
   id: number;
   title: string;
   tags: string[];
}

class PelisCollection {
   moviesColection: Peli[];

   getAll() {
      return readFile("./pelis.json").then((res) => {
         this.moviesColection = res;
         return this.moviesColection;
      });
   }
   getById(id: number) {
      return this.getAll().then((res) => {
         return res.find((p) => p.id == id);
      });
   }
   search(options: any) {
      return this.getAll().then((res) => {
         var aux = res;

         if (options.hasOwnProperty("title")) {
            aux = res.filter((p) => p.title.includes(options.title));
         }
         if (options.hasOwnProperty("tag")) {
            aux = aux.filter((p) => p.tags.includes(options.tag));
         }
         return aux;
      });
   }
   add(Peli: Peli) {
      return this.getAll().then((res) => {
         if (
            res.find((p) => {
               return p.id == Peli.id;
            })
         ) {
            return false;
         } else {
            res.push(Peli);
            writeFile("./pelis.json", res).then(() => {
               return true;
            });
         }
      });
   }
}
export { PelisCollection, Peli };
