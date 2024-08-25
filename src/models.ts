import * as jsonfile from 'jsonfile';
// El siguiente import no se usa pero es necesario
import './pelis.json';
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

type SearchOptions = { title?: string; tag?: string };

class Peli {
   id: number;
   title: string;
   tags: string[];
}

class PelisCollection {
   async getAll(): Promise<Peli[]> {
      // Devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas en el archivo JSON.
      return jsonfile.readFile('./pelis.json');
   }

   async add(peli: Peli): Promise<boolean> {
      const pelis = await this.getAll();
      const peliExistente = pelis.find((p) => p.id === peli.id);

      if (peliExistente) {
         return false;
      } else {
         pelis.push(peli);
         await jsonfile.writeFile('./pelis.json', pelis);
         return true;
      }
   }

   async getById(id: number): Promise<Peli> {
      const pelis = await this.getAll();
      return pelis.find((p) => p.id === id);
   }

   async search(options: SearchOptions): Promise<Peli[]> {
      const lista = await this.getAll();

      const listaFiltrada = lista.filter((p) => {
         let esteVa = false;
         if (options.tag && p.tags.includes(options.tag)) {
            esteVa = true;
         }
         if (options.title && p.title.includes(options.title)) {
            esteVa = true;
         }
         return esteVa;
      });

      return listaFiltrada;
   }
}

export { PelisCollection, Peli };
