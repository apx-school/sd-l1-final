import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peli:Peli[]=[];

  getAll(): Promise<Peli[]> {
      return jsonfile.readFile("./pelis.json").then((json) => {
        return this.peli=json;
        });
    };
  getById(id:number):Promise<Peli>{
    const promesa= this.getAll().then(()=>{
       return this.peli.find((item)=>item.id==id);
      });
      return promesa;
    }

  search(options:any):Promise<any>{
    return this.getAll().then((resultado)=>{
      let peliEncontrada=resultado;
      if(options.title){
        peliEncontrada=peliEncontrada.filter((item)=> {
          return item.title.includes(options.title)||item.title.toLowerCase().includes(options.title);
        });
    }
      if (options.tag){
        peliEncontrada= peliEncontrada.filter((item)=>{
        return item.tags.includes(options.tag);
      });
    }
    return peliEncontrada;
    });
  }
  add(pelicula: Peli): Promise<boolean> {
    const promesaUno = this.getById(pelicula.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.peli.push(pelicula);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.peli);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
};

    export { PelisCollection, Peli };
