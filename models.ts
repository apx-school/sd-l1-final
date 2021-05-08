import * as jsonfile from "jsonfile";

class Peli {

  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readfile("./pelis.json").then((pelisJson) => {
      this.data = pelisJson;
    return pelisJson;
    });
  }
  getById(id:number):Promise<any> {
    return this.getAll().then((pelcoll) => {
      const idPorParametro = pelcoll.find((item) => {
        if(item.id == id) {
          return true;}});

          return idPorParametro;
    })
  }
  search(options:any):Promise<any>{
    return this.getAll().then(()=>{
      const resultadoTitle = options.filter(function (item) {
        if (item.title.includes(options.title) || item.title.toLowerCase().includes(options.title))
        return item;
     });
       const resultadoTag = options.filter(function (item) {
         if (item.tag.includes()) return item;
         });
     return {resultadoTitle, resultadoTag};

    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const data = this.data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }

}
export { PelisCollection, Peli };





