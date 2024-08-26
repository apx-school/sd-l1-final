import * as jsonfile from 'jsonfile';
// El siguiente import no se usa pero es necesario
import './pelis.json';
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

export type SearchOptions = { title?: string; tag?: string };

class Peli {
   id: number;
   title: string;
   tags: string[];
}

class PelisCollection {
   async add(peli: Peli): Promise<boolean> {
      try {
         const pelis = await this.getAll();
         const peliExistente = pelis.some((p) => p.id === peli.id);

         if (peliExistente) {
            return false;
         } else {
            const data = [...pelis, peli];
            await jsonfile.writeFile('./src/pelis.json', data);
            return true;
         }
      } catch (error) {
         console.log(error);
      }
   }

   async getAll(): Promise<Peli[]> {
      return await jsonfile.readFile('./src/pelis.json');
   }

   async getById(id: number): Promise<Peli | undefined> {
      const pelis = await this.getAll();
      return pelis.find((p) => p.id === id);
   }

   async search(options: SearchOptions): Promise<Peli[]> {
      const lista = await this.getAll();

      const listaFiltrada = lista.filter((p) => {
         let esteVa = false;
         if (options.tag) {
            esteVa = p.tags.some((t) => t === options.tag);
         }
         if (options.title) {
            esteVa = p.title.includes(options.title);
         }
         return esteVa;
      });

      return listaFiltrada;
   }
}

export { PelisCollection, Peli };
