import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  list: Peli[] = []

  constructor() {
    (async () => {
        await this.getAll();
    })();
}


async getAll(): Promise<Peli[]>{
  try {
  const data = await jsonfile.readFile("./pelis.json");
  this.list = data;
  return this.list
} catch (err) {
 console.log(`Error al obtener las películas: ${err}`);
}

}

async getById(id: number): Promise<Peli> {
  try {
    await this.getAll();
    const peliEncontrada = this.list.find((peli) => peli.id === id);
    if (peliEncontrada) {
      return peliEncontrada;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async add(peli: Peli): Promise<boolean>{
  try {
      const promesaUno = await this.getById(peli.id).then((peliExistente) => {
          if (peliExistente) {
              return true;
          } else {
              return false;
          }
      })
      if (!promesaUno) {
          await this.getAll();
          this.list.push(peli)
          const promesaDos = jsonfile.writeFile("./pelis.json", this.list);
          return promesaDos.then((resultado)=>{
              return true;
          })
      } else {
          return false;
      }
      
  } catch (error) {
      return error
  }
}

async search(options: SearchOptions): Promise<Peli[]> {
  await this.getAll();
  let promesaUno: Promise<Peli[]>;
  if (options.title && options.tag) {
    promesaUno = Promise.resolve(this.list.filter((peli) => 
      peli.title.includes(options.title) && peli.tags.some((etiqueta) => etiqueta.includes(options.tag))
    ));
  } else if (options.title) {
    promesaUno = Promise.resolve(this.list.filter((peli) => peli.title.includes(options.title)));
  } else if (options.tag) {
    promesaUno = Promise.resolve(this.list.filter((peli) => peli.tags.includes(options.tag)));
  } else {
    promesaUno = Promise.resolve([]);
  }
  return promesaUno;
}

}
export { PelisCollection, Peli };
