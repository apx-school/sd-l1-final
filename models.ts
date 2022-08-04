import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const prom = await jsonfile.readFile("./pelis.json");
    return prom;
  }
  async getById(id: number): Promise<Peli> {
    const all = await this.getAll();
    const comparar = all.find((a) => a.id === id);
    return comparar;
  }
  async search(options: any): Promise<any> {
    const pelis = await this.getAll();
    return pelis.filter((item) => {
      if (options.title) {
        return item.title.includes(options.title);
      }
      if (options.tags) {
        return item.tags.includes(options.tags);
      }
      return false;
    });
  }
  async add(peli: Peli): Promise<boolean> {
    const promGet = this.getById(peli.id).then((peliPorId) => {
      //mismo ids
      if (peliPorId) {
        return false;
      } else {
        //agregar peli encadenando promesas
        const data = this.getAll().then((data) => {
          ////prueba de delete obj
          delete peli["options"];
          data.push(peli);

          const promAdd = jsonfile.writeFile("./pelis.json", data);
          return promAdd.then(() => {
            return true;
          });
        });

        return true;
      }
    });
    return promGet;
  }
}

//////////pruebas////////////
/*  const prueba = new PelisCollection();
 */
/* prueba.getAll().then((res) => console.log(res));
prueba.getById(1).then((res) => console.log(res)); 
prueba.search({ tag: "accion" }).then((res) => console.log(res));
*/
/* prueba
  .add({
    id: 6,
    title: "title 6",
    tags: ["tt", "rr"],
  })
  .then((res) => console.log(res)); */

///////////////////////////////////////

export { PelisCollection, Peli };
