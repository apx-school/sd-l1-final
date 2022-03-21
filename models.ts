import { readFile, writeFile } from "fs/promises";
import { threadId } from "worker_threads";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  rating?: number;
  tags: string[];
  constructor(id: number, title: string, tags: string[]) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  }
}

class PelisCollection {

  filePath: string = "./pelis.json";

  async getAll(): Promise<Peli[]> {
    const buffer = await readFile(this.filePath);
    const string = buffer.toString();
    return JSON.parse(string);
  }

  async getById(id: number): Promise<Peli> {
    const todasPelis: Peli[] = await this.getAll();
    return todasPelis.find((peli: Peli) => {
      return peli.id === id;
    });
  }
  //si tiene propieda title se busca por ese string en el titulo
  //si tiene tag debe devolver las que tengan ese string en los tag
  //tags es un array, se filtra por cada tag
  async search(params: { title?: any; tag?: string; tags?: string[]; }): Promise<Peli[]> {
    //tags se inicializa como array vacio
    const {title, tags = [], tag} = params;
    //si hay un tag, se pushea al array de tags
    if(tag) {
      tags.push(tag)
    }
    
    let array = await this.getAll();
    // console.log("title: " + title)
    // console.log(`tags :${tags}`)
    // console.log(tags)
    // console.log(" array despues de getAll")
    // console.log(array)
    if (title) {
      array = array.filter((p) => {
        const regularExpression = new RegExp(title, "i");
        return regularExpression.test(p.title);
      });
    }
    // console.log(" array despues de filtro por titulo: " + title)
    // console.log(array)

    // console.log(`tag: ${tag}`)
    // console.log(`tags: ${tags}`)
    //tags siempre es un array
    //si tags no es undefined y no incluye undefined
    if (tags.length != 0) {
      /*
      array es igual a
      las pelis del array en las que
      alguno de sus tags(tagsDeLaPeli)
      esta incluido en los tags
      recibidos como parametro
      */
      array = array.filter(peli => {
        const tagsDeLaPeli = peli.tags
        return tagsDeLaPeli.some(tagPeli => tags.includes(tagPeli))
      })

    }

    // console.log(" array despues de filtro por tags: " + tags)
    // console.log(array)

    return array;
  }

  //sin id repetido
  async add(peli: Peli): Promise<any> {
    const peliExiste = await this.getById(peli.id);
    //si el id existe...
    if (peliExiste) {
      return false;
    }
    const todasPelis = await this.getAll();
    todasPelis.push(peli);
    const json = JSON.stringify(todasPelis);
    await writeFile(this.filePath, json);
    return true;
  }
}


// await collection.add({
  //   id: TEST_ID,
  //   title: TEST_TITLE,
  //   tags: ["tt", "rr"],
  // });
  // await collection.add({
    //   id: SECOND_TEST_ID,
    //   title: SECOND_TEST_TITLE,
    //   tags: ["yy", "uu"],
    // });
    // const all = await collection.getAll();
    // const a = all[0];
    // const b = await collection.search({ title: SESSION_ID });
    // const ids = b.map((b) => b.id);
// async function tests(){
//   const collection = new PelisCollection();
//   await collection.add({
//       id: 123,
//       title: "TEST_TITLE",
//       tags: ["tt", "rr"],
//     })

//   const all = await collection.getAll()
//   const a = all[0];
//   // console.log(a)
//   const b = await collection.search({ title: "TEST_TITLE" });
//   const ids = b.map((b) => b.id);
// }

// tests()


export { PelisCollection, Peli };
