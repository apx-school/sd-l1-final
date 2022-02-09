import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const promesa = await jsonfile.readFile("./pelis.json")
      // la respuesta de la promesa
  return promesa
  }
  async getById(id:number){
    const resultado = await this.getAll()
    return resultado.find((peli)=>{ return peli.id == id})
  }
  
}



const pelis = new PelisCollection
pelis.getById(14).then((resultado)=> console.log(resultado))

export { PelisCollection, Peli };
