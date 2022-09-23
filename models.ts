import { readFile } from "fs";
import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
  async getAll(): Promise<Peli[]> {
    const data = await jsonfile.readFile(__dirname + "/pelis.json" );
    return (this.peliculas = data);
  }

  async getById(id:number): Promise<Peli>{
    await this.getAll();
    const findex = this.peliculas.find((i)=>i.id == id);
    return findex
  }




  async search(options: any): Promise<Peli[]>{
    await this.getAll();
    if(options.title && options.tag){
      return this.peliculas.filter((i)=>{
        return (i.title.includes(options.title) && i.tags.includes(options.tag))
      });
    }
    if(options.title){
      return this.peliculas.filter((i)=>{
        return i.title.includes(options.title);
      });
    }
    if(options.tag){
      return this.peliculas.filter((i)=>{
        return i.tags.includes(options.tag)
      });
    }
  }


    async add(peli: Peli): Promise<boolean> {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          return this.getAll().then((i)=>{
            i.push(peli);
            const promesaDos = jsonfile.writeFile("./pelis.json", i);
            return promesaDos.then(() => {
              return true;
            });
          })
        }
      });
      return promesaUno
    }
          // const data = await this.getAll()
          // console.log(data)
          // data.push(peli);
          // console.log(data)
          // const promesaDos = jsonfile.writeFile("./pelis.json", data);  
          // return promesaDos.then(() => {
          //   return true;
      
  
}


async function main(){
  const peliCollection1 = new PelisCollection;
  peliCollection1.getAll();
  // peliCollection1.getById(1);
  // peliCollection1.search({title:'de'});
  const peli = new Peli;
  // peli.id = 4;
  // peli.tags = ['war', 'guerra', 'comedia'];
  // peli.title = 'War practica';
  // peliCollection1.add(peli);
  // peliCollection1.add({id: 5, title: 'Otra guerra', tags: ['war', 'comedia', 'prueba']});

  // peliCollection1.search({tags:'war'});

  // console.log(await peli1.getAll());
  // console.log(await peli1.getById(1))
  // peli1.getById(1)
  
  // (async()=>{
  //   const res = await peli1.getById(1);
  //   console.log(res)
  // })() 
}
  main()
export { PelisCollection, Peli };
