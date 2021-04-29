import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli [];
  

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return this.pelis = pelis;
    });
  }

  getById(id:number){
    return this.getAll().then((pelis)=>{
      return pelis.find((peli)=>{
        return peli.id == id;
      });
    });
  }

  search(options:any){
    return this.getAll().then((pelis)=>{
      if (options.title){
        return pelis.filter((peli)=>{
          return peli.title.includes(options.title);
        });
      };
       if (options.tag){
        return pelis.filter((peli)=>{
          return peli.tags.includes(options.tag);
        });
      }
    });

  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        this.pelis.push(peli);
        const data = this.pelis;
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

