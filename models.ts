import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = {
  title?: string | number;
  tag?: string;
}

class PelisCollection {
  getAll(): Promise<Peli[]>{
    return jsonfile.readFile('./pelis.json').then((res) => {
      return res;
    })
  }
  async getById(id: number): Promise<Peli> {
const pelis = await this.getAll();
const peli = pelis.find(pel => pel.id === id);
console.log(peli);
return peli
  }
  async add(peli: Peli): Promise<boolean> {
    const pelis = await this.getAll();
    const seRepeat = pelis.some(peli => peli.id === peli.id)
    if(seRepeat){
      const data = pelis
      data.push(peli)
      return jsonfile.writeFile('./pelis.json', data).then(() => {
        return true
      })
    }else{
      return false
    }
  }
  async search(options: SearchOptions): Promise<any> {
    const pelis = await this.getAll()
    
    if(options.tag && options.title){
      return pelis.filter((pelis) =>{
        return pelis.tags.includes(options.title.toString())
      })
    }

    if(options.tag){
      return pelis.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
    }
  }
}

export { PelisCollection, Peli };