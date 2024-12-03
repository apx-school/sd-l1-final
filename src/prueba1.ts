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
      this.coleccion = await jsonfile.readFile(filePath/*"./pelis.json"*/)
      return this.coleccion
  }

  async getById(id: number): Promise<Peli | undefined> {
      await this.getAll()    //.then((resultado) => {
      const idExiste = this.coleccion.find((item) => item.id === id)
    
    return idExiste
  }
  
  async add(peli: Peli): Promise<boolean> {

  await this.getAll()
    const promesaUno = await this.getById(peli.id);//.then((peliExistente: Peli | undefined) => {
       
   if (promesaUno/*peliExistente*/) {
       return(false); //se podría usar: console.log (false) y luego return false tmb...
   } else {
     const data = [...this.coleccion];
     const filePath = path.join(__dirname, 'pelis.json')
     data.push(peli);
  //console.log(data)
     const promesaDos =  await jsonfile.writeFile(/*"./pelis.json"*/filePath, data); //.then((nuevaData) => { nuevaData });
   //console.log(promesaDos)
     //VER ESTO NO ESTOY ESPERANDO QUE SE CUMPLA ESTO
       //return  promesaDos.then(() => { //this.cargaData()
       return  (true);
       }//);
      // }
      //} //)
      
   //     return promesaUno;
      }
  
 

  
  async search(options: SearchOptions): Promise<Peli[]> {
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
export const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  return 129856 + randomNumber;
};

const SESSION_ID = getRandomId();

const TEST_ID = getRandomId();

const TEST_TITLE = "title " + SESSION_ID + TEST_ID;

const SECOND_TEST_ID = getRandomId();

const SECOND_TEST_TITLE = "title " + SESSION_ID + SECOND_TEST_ID;

async function main() {
  const collection = new PelisCollection();

  //const collection = new PelisCollection();
  //await collection.init()
  const respuesta1 = await collection.add({
    id: TEST_ID,
    title: TEST_TITLE,
    tags: ["tt", "rr"],
  })//.then((respuesta) => { return respuesta });
  //console.log('Respuesta 1:', respuesta1);
  const respuesta2 = await collection.add({
    id: SECOND_TEST_ID,
    title: SECOND_TEST_TITLE,
    tags: ["yy", "uu"],
  })//.then((respuesta) => { return respuesta })
    ;
  console.log(await collection.getAll())
}
main()
  
////////------------------------------------------------------------------------------/////

// const nuevaPeli = new Peli(8, "El viaje de panchiro", "asdfasdf");
// //nuevaColeccion.init().then((resultado)=> {console.log(resultado)})
// //(nuevaColeccion.getById(1)).then((resultado) => { console.log(resultado) })

// const pruebaMetodoAdd = nuevaColeccion.add(nuevaPeli).then((respuesta) => {return respuesta})
//console.log (pruebaMetodoAdd)
//nuevaColeccion.getAll().then((resp) => {console.log (resp)})
//const pruebador: SearchOptions = { tag: "Thriller" } // {title : "al"}
//const aVerComoEstaEso = nuevaColeccion.search(pruebador).then((resultado) => console.log(resultado))
export { PelisCollection, Peli,SearchOptions };
