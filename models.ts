import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll():Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json");
    promesa.then((json)=>{
      this.data = json
    })
   return promesa;
  }
  getById(id:number){
    const encontrado = this.getAll().then((peli)=>{
      peli.find((item)=>{
        if(item.id == id){
          return peli
        }
      });
    });
    return encontrado;
  }
  search(options: any) {
    var resultado;
    if (options == "title") {
      const resultado = this.getAll().then((peli) => {
        peli.find((item) => {
          if (item.title == options) {
            return peli;
          }
        });
      });
    }
    if (options == "tags") {
      const resultado = this.getAll().then((peli) => {
        peli.find((item) => {
          if (item.tags == options) {
            return peli;
          }
        });
      });
    }
    return resultado;
  }
  add(peli: Peli) {
    const pelis = this.getAll().then((p) => {
      this.data.filter((p) => {
        if (p.id !== peli.id) {
          const agregaPeli = this.data.push(peli);
          const guardaPeli = jsonfile.writeFile("./pelis.json", this.data);
          return true;
        } else {
          return false;
        }
      });
    });
  }
}
export { PelisCollection, Peli };
