import { PelisCollection, Peli } from './models';

type Options = {
   id?: number;
   search?: {
      title?: string;
      tag?: string;
   };
};

class PelisController {
   collection: PelisCollection;

   constructor() {
      this.collection = new PelisCollection();
   }

   async get(options: Options): Promise<Peli[]> {
      if (options.id) {
         const peli = await this.collection.getById(options.id);
         return peli ? [peli] : [];
      } else if (options.search) {
         return this.collection.search(options.search);
      } else {
         return this.collection.getAll();
      }
   }

   async add(peli: Peli): Promise<boolean> {
      return this.collection.add(peli);
   }
}

export { PelisController };
