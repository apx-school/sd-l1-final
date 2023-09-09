import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}

//agregamos searchOption por alguna razon no me devolvia los tags
type SearchOptions = {
  tag?: string;
  title?: string | number;
};
class PelisCollection {

  peliculas: Peli[];

//devolvemos toda la lista de peliculas
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((res) => {
      const repuesta: Peli[] = res;
      return repuesta;
    });
  }
//Filtramos por ID
  async getById(id: number): Promise<Peli> {
   const resultado = await this.getAll().then((peli) => {
    return peli.find((p) => p.id === id);
   })
   return resultado;
  }

//Agregamos peliculas a nuestro array de pelis.json
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((peliculas) => {
          peliculas.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", peliculas);
        return promesaDos.then(() => {
          return true;
        });
      });
      }
    });
        return promesaUno;
  }

  //Buscamos la pelicula por {titulo, tag}
  //agregamos el metodo SearchOption por alguna razon no me funcionaba los tags.
  async search(options: SearchOptions): Promise<Peli[]> {
    
    const lista = await this.getAll();
     
    
    if (options.tag && options.title) {
      return lista.filter((peli) => {
        return (
          peli.tags.includes(options.tag) &&
          peli.title.includes(options.title.toString())
        );
      });
    }


   if (options.title) {
    return lista.filter((peli) => {
      return peli.title.includes(options.title.toString());
    });
   }



   if (options.tag) {
    return lista.filter((peli) => {
      return peli.tags.includes(options.tag);
    });
   }
  }
  
}
export { PelisCollection, Peli, SearchOptions };

//probando
//getALL
/*const probando = new PelisCollection();
probando.getAll().then((res) => console.table(res));*/

//prueba de getByID
/*const collection = new PelisCollection();
collection.getById(1).then((resultado) => {
  console.log(resultado); //devuelve la id N°2 
});*/

//probamos title y tags como resultado anda a la perfeccion.
//const collection = new PelisCollection();
/*collection.search({ title: "Peli Dos", tag: "Drama" }).then((res) => console.table(res));*/



// mock:
/*const peliToAdd = new Peli();
peliToAdd.id = 11;
peliToAdd.title = "pelicula numero 1";
peliToAdd.tags = ["one", "two", "three"];
collection.add(peliToAdd);*/

 
