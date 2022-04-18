import { PelisCollection, Peli } from "./models";

class PelisController {
   pelisColl: PelisCollection;
   constructor() {
      this.pelisColl = new PelisCollection();
   }

   async get(options): Promise<any> {
      if (options.id) {
         return await this.pelisColl.getById(options.id);
      } else if (options.search) {
         return this.pelisColl.search(options.search);
      } else return this.pelisColl.getAll();
   }
   async add(peli: Peli) {
      return this.pelisColl.add(peli);
   }
}

export { PelisController };
