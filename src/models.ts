import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };


class PelisCollection {


  async add(peli: Peli):Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if(peliExistente){
        console.log('esa peli ya existe')
        return false;
      }else{
          const data = this.getAll();

          //console.log(data)

          data.then((pelis) => {
            pelis.push(peli);
            const promesaDos = jsonfile.writeFile("./pelis.json", pelis)
          
          promesaDos.then(() => {
            //console.log(pelis)
            return true;
          });
        });
      }
    })

    //console.log(promesaUno, typeof(promesaUno))
    return promesaUno;
  }

  

  getById(id:number):Promise<Peli>{
    return this.getAll().then((pelis) => {
      const peliEncontrada = pelis.find((peli) => peli.id === id);
      if (peliEncontrada) {
          console.log(peliEncontrada)
          return peliEncontrada;
      }
  });
  }

   async getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((obj) => {
      const coleccion = obj;
      console.log(coleccion)
      return coleccion;
    });
  }

  async search(options:SearchOptions){
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p) => {
        let esteVa = true; // Por defecto, consideramos que el elemento debe incluirse en la lista filtrada

        if (options.tag && !p.tags.includes(options.tag)) {
            // Si se proporciona un tag en las opciones y el elemento no lo incluye, no lo incluimos en la lista filtrada
            esteVa = false;
        }

        if (options.title && !p.title.includes(options.title)) {
            // Si se proporciona un título en las opciones y el elemento no lo incluye, no lo incluimos en la lista filtrada
            esteVa = false;
        }

        return esteVa;
    });

    console.log(listaFiltrada);
    return listaFiltrada;
  }


}

export { PelisCollection, Peli };

const coleccion = new PelisCollection;
//coleccion.getAll()
//coleccion.getById(11)
//coleccion.add({ id: 11, title: 'Men in black', tags: [ 'comedia', 'ciencia ficcion' ] });
//coleccion.search({title:'diablo'})
//coleccion.search({tag:'terror'})
