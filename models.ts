import * as json from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
   id: number;
   title: string;
   tags: string[];
}

class PelisCollection {
   getAll(): Promise<any[]> {
      return json.readFile("./pelis.json").then((resp) => {
         return resp;
      });
   }
   getById(id: number) {
      return this.getAll().then((resp) => {
         const searchId = resp.find((i) => {
            return i.id == id;
         });
         return searchId;
      });
   }
   search(options: any): Promise<any> {
      return this.getAll().then((peliculas) => {
         if (options.title && options.tag) {
            return peliculas.filter((peliculas) => {
               return (
                  peliculas.title.includes(options.title) &&
                  peliculas.tags.includes(options.tag)
               );
            });
         } else if (options.title) {
            return peliculas.filter((peliculas) => {
               return peliculas.title.includes(options.title);
            });
         } else if (options.tag) {
            return peliculas.filter((peliculas) => {
               return peliculas.tags.includes(options.tag);
            });
         }
      });
   }
   add(peli: Peli): Promise<boolean> {
      const promesaUno = this.getById(peli.id).then((pelis) => {
         if (pelis) {
            return false;
         } else {
            const segundaPromesa = this.getAll().then((peliculas) => {
               peliculas.push(peli);
               return json.writeFile("./pelis.json", peliculas);
            });
            return segundaPromesa.then(() => {
               return true;
            });
         }
      });
      return promesaUno;
   }
}
export { PelisCollection, Peli };
