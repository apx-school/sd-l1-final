import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import { error } from "console";
import { promises } from "dns";
import { moveMessagePortToContext } from "worker_threads";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
  constructor(id, title, tags){
    this.id = id;
    this.title = title;
    this.tags = tags;
  }
}

type searchOptions = {
  title?: string; 
  tag?: string;
}

class PelisCollection {
  // Funcion getAll()
  async getAll(): Promise<Peli[]> {
    try{
      const pelis = await jsonfile.readFile("src/pelis.json");
      return pelis
    }catch(err){
      console.log("Error al leer el archivo: " + err)
      return null;
    }
  }
 
  // funcion getById();
  async getById(id: number): Promise<Peli | null>{
    try{
      const pelis = await this.getAll()
      const peliEncontrada = pelis.find(p => p.id === id);
      return peliEncontrada;

    }catch(err){
      console.log("error en la busqueda: " + err)
      return null;
    }
  }

  // funcion add()
  add(nuevaPeli: Peli): Promise<boolean>{
    // chequeamos que la peli no exista en el archivo ni este repetida
    const promise1 = this.getById(nuevaPeli.id).then((peliExist)=>{
      if(peliExist){
        //console.log("La peli ya existe");
        return false;
      }else{
        //console.log("La peli puede ser agregada")
        // Agregamos una promesa para guardar las pelis en una constante y luego agregar todo al archivo
        return this.getAll().then((pelis)=>{
          pelis.push(nuevaPeli);
          return jsonfile.writeFile("src/pelis.json", pelis).then(()=>{
            //console.log("La peli fue agregada")
            return true;
          });
        })
      }
    })
    return promise1;
  }

  // Funcion search()
  async search(options: searchOptions){
    // Primero obtener una lista de pelis para filtrar
    const lista = await this.getAll();
    // Verificamos que el objeto tenga ambas propiedades
    if(options.title && options.tag){
      const listaFiltradaTitleTags = lista.filter((peli) => peli.title.toLocaleLowerCase().includes(options.title.toLocaleLowerCase()) 
                                     && peli.tags.some(tag => tag.toLocaleLowerCase() === options.tag.toLocaleLowerCase())
      );
      //console.log(listaFiltradaTitleTags);
      return listaFiltradaTitleTags;

    }
    // Filtramos por titulo
    else if(options.title){
      const listaFiltradaPorTitle = lista.filter((peli) => peli.title.toLocaleLowerCase().includes(options.title.toLocaleLowerCase()))
      //console.log(listaFiltradaPorTitle);
      return listaFiltradaPorTitle;
    }
    // Filtramos por tag
    else if(options.tag){
      const listaFiltradaPorTags = lista.filter((peli) => peli.tags.some(tag => tag.toLocaleLowerCase() === options.tag.toLocaleLowerCase()))
      //console.log(listaFiltradaPorTags);
      return listaFiltradaPorTags;
    // Si recibimos ambos parametros, usamos ambos para filtrar
    }// Si no posee niguna propiedad
    else {
      console.log("Ningun parametro valido");
      return [];
    }
  };

}

// test en archivo

//const model = new PelisCollection();
/*model.getAll().then((p)=>{
  //console.log(p);
})
model.getById(2).then((p)=>{
  //console.log(p)
})
model.add({"id": 4,"title": "Duro de matar","tags": ["f", "b", "h"]}).then((b)=>{
  console.log(b)
})
model.search({tag: "b"}).then((p)=>{
  console.log(p)
});*/


export { PelisCollection, Peli, searchOptions };
