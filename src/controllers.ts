import { PelisCollection, Peli, SearchOptions } from './models';

type Options = {
   id?: number;
   search?: SearchOptions;
};

class PelisController {
   collection: PelisCollection;

   constructor() {
      this.collection = new PelisCollection();
   }

   async get(options: Options): Promise<Peli[]> {
      if (options.id) {
         const peli = await this.collection.getById(options.id);
         return [peli];
      } else if (options.search) {
         const pelis = await this.collection.search(options.search);
         return pelis;
      } else {
         return this.collection.getAll();
      }
   }

   async add(peli: Peli): Promise<boolean> {
      return this.collection.add(peli);
   }
}

export { PelisController };
