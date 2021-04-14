import { PelisCollection, Peli } from "./models";

class PelisController {
   peliculas: PelisCollection;

   constructor() {
      this.peliculas = new PelisCollection();
   }
   get(options: any) {
      if (options.hasOwnProperty("id")) {
         return this.peliculas.getById(options.id);
      } else if (options.hasOwnProperty("search")) {
         return this.peliculas.search(options.search);
      } else {
         return this.peliculas.getAll();
      }
   }
   add(Peli: Peli) {
      return this.peliculas.add(Peli);
   }
}
export { PelisController };
