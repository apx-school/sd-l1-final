/*
En models.ts:

    Tomá la estructura base y completá la clase PelisCollection. Además, agregale a esta clase los siguientes 
    métodos asincrónicos (o sea que todos deben devolver una promesa que a su vez devuelva lo indicado en cada método):
        getAll() devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas en el archivo JSON de pelis.
        getById(id:number) devuelve la peli que tenga el id que se le pase por parámetro.
        search(options:any) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
            si el objeto tiene la propiedad title, el método tiene que devolver todas las películas que tengan ese string
             en su title. (Por ejemplo si search es "a" debe devolver todas las películas que tengan la letra "a"
              en su title.)
            si el objeto tiene la propiedad tag, el método tiene que devolver todas las películas que tengan ese string
             en sus tags. (Por ejemplo si tags es "classic" debe devolver todas las películas que tengan el tag "classic".) 
        add(peli:Peli) recibe una Peli y la guarda en el archivo. Tiene que devolver un boolean que indique si se agregó
         correctamente la peli. No debe admitir agregar IDs repetidos. O sea que, si no pudo guardar el dato en el
          archivo por algún error de escritura o por que el id está duplicado, debe devolver false.
        Tener en cuenta que acá seguramente hayan dos promesas encadenadas. Una para chequear si la peli existe 
        y otra para crear la peli en el archivo. Para resolver ese problema tener en cuenta el siguiente patrón:
*/


import * as jsonfile from "jsonfile";

import { readFile } from "fs/promises";
import { writeFile } from "fs";
import { stringify } from "querystring";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelisCollection:Peli[] = []

  async pullData(){
    const dato = await readFile("./pelis.json")
    const dato1 = await dato.toString();
    const dato2 = await JSON.parse(dato1);
    this.pelisCollection = dato2
    return  this.pelisCollection
  }

  getAll(){
    return this.pullData()
  }

  async getById(id:number){
    await this.pullData()
    const busqueda = this.pelisCollection.find((x => x.id === id))
    return busqueda //ojo que antes tiraba un consolelog
  }

  async search(option:any) {


    let data = this.pelisCollection

    let filtrado = Object.entries(option).map( function(valoresOptions) {
 
      const buscado = valoresOptions[1].toString().toLowerCase();
      
      if (valoresOptions[0] == "title") {
        const filtro = data.filter(item => item.title.toString().toLowerCase().indexOf(buscado) !== -1)
        data = filtro
        return data
  
      } else {

        const filtro = data.filter(item => item.tags.indexOf(buscado) !== -1)
        data = filtro
        return data
      }
    }
    )
    console.log(data)



    // const busqueda = Object.entries(option).map(function(value){
      
    //     return data.filter(item => value[0].toLowerCase().indexOf(value[0]) !== -1)
    // }
    // )
    // console.log('soyestabusqyeda',busqueda)
    // console.log('soydataafuera',data)
    
  }

  async add(peli:Peli) {
    await this.pullData();
    let data = this.pelisCollection
    if ((await (this.getById(peli.id))) === undefined) {
      this.pelisCollection.push(peli)
      const data = JSON.stringify( this.pelisCollection)
      return writeFile("./pelis.json",data, (err) => {
          if (err)
            console.log(false);
          else {
            console.log(true)
          }
      })
    } else {
      console.log(false)
    }

  }

};

export { PelisCollection, Peli };

// function main(){
//   // console.log('soy main')
//   const collecionPrueba = new PelisCollection
//   collecionPrueba.pullData()
//   //collecionPrueba.getAll()
//   collecionPrueba.getById(5)
//   collecionPrueba.search({ title:"la" })
//   collecionPrueba.search({ tags:"comedia"})
//   // collecionPrueba.add({id: 69, title:'Lo Casafantama2', tags:['demierda','confantasma']})
//   // collecionPrueba.getAll()

// }

// main()



// if (Object.keys(option)[0] === "title") {
//   const resultado = data.filter(item => item.(Object.keys(option)[0]).toLowerCase().indexOf(buscado) !== -1)
//   data = resultado   
// } else {
//  const resultado = data.filter(item => item.tags.indexOf(buscado) !== -1)
//  data = resultado
// }