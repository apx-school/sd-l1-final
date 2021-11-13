/*
En models.ts:

    Tomá la estructura base y completá la clase PelisCollection. Además, agregale a esta clase los siguientes 
    métodos asincrónicos (o sea que todos deben devolver una promesa que a su vez devuelva lo indicado en cada método):
        getAll() devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas en el archivo JSON de pelis.
        getById(id:number) devuelve la peli que tenga el id que se le pase por parámetro.
        search(options:any) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
            si el objeto tiene la propiedad title, el método tiene que devolver todas las películas que tengan ese string en su title. (Por ejemplo si search es "a" debe devolver todas las películas que tengan la letra "a" en su title.)
            si el objeto tiene la propiedad tag, el método tiene que devolver todas las películas que tengan ese string en sus tags. (Por ejemplo si tags es "classic" debe devolver todas las películas que tengan el tag "classic".) 
        add(peli:Peli) recibe una Peli y la guarda en el archivo. Tiene que devolver un boolean que indique si se agregó correctamente la peli. No debe admitir agregar IDs repetidos. O sea que, si no pudo guardar el dato en el archivo por algún error de escritura o por que el id está duplicado, debe devolver false.
        Tener en cuenta que acá seguramente hayan dos promesas encadenadas. Una para chequear si la peli existe y otra para crear la peli en el archivo. Para resolver ese problema tener en cuenta el siguiente patrón:
*/


import * as jsonfile from "jsonfile";
import { readFile } from "fs/promises";
import { writeFile } from "fs";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelisCollection:Peli[]=[]

  async pullData(){
    const datos = await readFile("./pelis.json")
    const texto = JSON.parse(datos.toString())
    this.pelisCollection = texto
    return this.pelisCollection
  }

  async getAll(){
    await this.pullData()
    console.log(this.pelisCollection) 
  }

  async getById(idBuscado:number){
    await this.pullData()
    const busqueda = this.pelisCollection.find((x => x.id === idBuscado))
    console.log(busqueda)
  }

  async search(texto:string) {
    await this.pullData()
    const busqueda = this.pelisCollection.filter(item => item.title.indexOf(texto.toLowerCase()) !== -1)
    console.log(busqueda)
  }

  async addOne(peli:Peli) {
    await this.pullData()
    return this.pelisCollection.push(peli)
  }

  async save(){
    await this.pullData
    const data = this.pelisCollection.toString()
    return writeFile("./pelis.json",data, () => { /* Silent error */ })
  }

};


export { PelisCollection, Peli };

function main(){
  // console.log('soy main')
  const collecionPrueba = new PelisCollection
  collecionPrueba.pullData()
  collecionPrueba.getAll()
  collecionPrueba.getById(3)
  collecionPrueba.search('ra')
  collecionPrueba.addOne({id: 66, title:'Lo Casafantama', tags:['demierda','confantasma']})
//  collecionPrueba.save()
  collecionPrueba.getAll()

}

main()