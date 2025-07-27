import * as jsonfile from "jsonfile";
import * as path from "path";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import { match } from "assert";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras

type SearchOptions = {title?: string, tag?: string};
const pelisPath = path.join(__dirname, "pelis.json");


class Peli {
  id: number;
  title: string;
  tags: string[];
}
class PelisCollection {

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(pelisPath).then((r) => {
     return r}) // la respuesta de la promesa
    };

  getById(id): Promise<Peli> {
    return this.getAll().then((l) =>{ 
      const resultado = l.find((peli) => {
        return peli.id === id});
        return resultado;
      }) 
    }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente){
      return false;
      }else{
        const leerPelis = jsonfile.readFile(pelisPath);
        const arrPeli = leerPelis.then((pelis) => {pelis.push(peli);
        return jsonfile.writeFile(pelisPath, pelis)
      })
      return arrPeli.then(() => 
        {return true});
    }})
      return promesaUno;
    }

   async search(options: SearchOptions){
      const lista = await this.getAll();
      const filtro = lista.filter((p: Peli) => {
        let esteVa: boolean = false;
        let esteTb:boolean = false;

        if (options.title && options.tag) {
        return p.title.toLowerCase().includes(options.title.toLowerCase()) &&
         p.tags.includes(options.tag);
        } else if (options.title) {
        return p.title.toLowerCase().includes(options.title.toLowerCase());
        } else if (options.tag) {
         return p.tags.includes(options.tag);
        }

      })
      //console.log("PELICULAS FILTRADAS", filtro);
      return filtro;
    }
  }


export { PelisCollection, Peli };