import { log } from "console";
import * as jsonfile from "jsonfile";
import * as lodash from 'lodash'
import { json } from "stream/consumers";


class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  getAll = async (): Promise<Peli[]> => {
    const datosJson = await jsonfile.readFile(__dirname + '/pelis.json');
    return datosJson
  }

  add = async (pelicula: Peli): Promise<boolean> => {
    const cargarDatos = await jsonfile.readFile(__dirname + '/pelis.json');
    console.log(cargarDatos)
    const datosRepetidos = lodash.some(cargarDatos , (x)=>x.id === pelicula.id)
    console.log(datosRepetidos);

    if (datosRepetidos === false) {
      const pelisCargadas = await this.getAll()
      pelisCargadas.push(pelicula);
      jsonfile.writeFile(__dirname + '/pelis.json', pelisCargadas).then(() => {
        console.log(`La pelicula ${pelicula} se guardo correctamente$`);
        return true
      })

    } else {
      console.log(`La pelicula ${pelicula} ya se encuentra registrada`);
      return false
    }
  }

}

/*
Recibe una Peli y la guarda en el archivo.

Tiene que devolver un boolean que indique si se agregó correctamente la peli.

No debe admitir agregar IDs repetidos. O sea que, si no pudo guardar el dato en el archivo por algún error de escritura o por que el id está duplicado, debe devolver false.
Tener en cuenta que acá seguramente hayan dos promesas encadenadas. 
*/
export { PelisCollection, Peli };

const test = async function () {
  const tele = new Peli()
  tele.id = 8;
  tele.title = "jimmy";
  tele.tags = ["ola", "jefe"]



  const promesa = new PelisCollection()
  promesa.add(tele)
}

test()
