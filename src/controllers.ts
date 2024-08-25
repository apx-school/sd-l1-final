import { PelisCollection, Peli } from './models';

type Options = {
   id?: number;
   search?: {
      title?: string;
      tag?: string;
   };
};

class PelisController {
   pelisCollection: PelisCollection;

   constructor() {
      this.pelisCollection = new PelisCollection();
   }

   async get(options?: Options) {
      if (options) {
         if (options.id) {
            return this.pelisCollection.getById(options.id);
         } else if (options.search) {
            return this.pelisCollection.search(options.search);
         }
      } else {
         return this.pelisCollection.getAll();
      }
   }

   async add(peli: Peli) {
      return this.pelisCollection.add(peli);
   }
}

export { PelisController };
