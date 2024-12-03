
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import path from "path";

//const pelis = require("./pelis.json");
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
   constructor(id, title, tags) {
     this.id = id;
     this.title = title;
     this.tags = tags
   }
}

class PelisCollection {
  coleccion: Peli[] =[]
  constructor() {

    }



  async getAll() {
    const filePath = path.join(__dirname, 'pelis.json')
   
    //setTimeout
    this.coleccion = await jsonfile.readFile(filePath)
      //console.log(filePath)
    return this.coleccion
  }

  async getById(id: number): Promise<Peli | undefined> {
      await this.getAll()    //.then((resultado) => {
      const idExiste = this.coleccion.find((item) => item.id === id)
    
    return idExiste
  }
  
  async add(peli: Peli): Promise<boolean> {
  
  await this.getAll()
   const promesaUno =  this.getById(peli.id).then((peliExistente: Peli | undefined) => {
       
   if (peliExistente) {
       return(false); //se podría usar: console.log (false) y luego return false tmb...
   } else {
     const data = [...this.coleccion];
     const filePath = path.join(__dirname, 'pelis.json')
     data.push(peli);
  //console.log(data)
     const promesaDos = jsonfile.writeFile(filePath/*"./pelis.json"*/, data).then((nuevaData) => { nuevaData });
     //console.log(promesaDos)
     //VER ESTO NO ESTOY ESPERANDO QUE SE CUMPLA ESTO
     
       return  promesaDos.then(() => { //this.cargaData()
       return  (true);
       });
       }
      } )
      
        return promesaUno;
      }
  
 

  
  async search(options: SearchOptions): Promise /*<any>*/<Peli[]> {
    let listatTotalPelis = await this.getAll() //this.getAll() Esto corregido para la prueba de add
    const listraFiltrada = listatTotalPelis.filter(function (peli) {
        let doubleCheck = true//false;
        if (options.tag) {
        let coincideTag = peli.tags.some(etiqueta => etiqueta.toLowerCase() === options.tag.toLowerCase())
        doubleCheck = doubleCheck && coincideTag };
   
          // si pasa cambio "doubleCheck" a true
        
        if (options.title) {
        let coincideTitulo= peli.title.toLowerCase().includes(options.title.toLowerCase())
          // si pasa cambio "doubleCheck" a true
        doubleCheck = doubleCheck && coincideTitulo
        }
        return doubleCheck;
      });
    
      return listraFiltrada;
  };
    


  
}

type SearchOptions = { title?: string; tag?: string };

export { PelisCollection, Peli,SearchOptions };

