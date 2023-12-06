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
  async getAll(): Promise<Peli[]>{
    const pelis: Peli[] = await 
    jsonfile.readFile('./pelis.json');
    return pelis;
  }
  async getById(id: number): Promise<Peli> {
const pelis = await this.getAll();
const peId = pelis.find((pel) => {
  return pel.id == id;
  });
  return peId}

  async add(peli: Peli): Promise<boolean> {
    const pelis = await this.getAll();
    const seRepeat = pelis.find((peli) => {
      return peli.id == peli.id});
    if(seRepeat){
      return false
    }else{
      pelis.push(peli);
      await jsonfile.writeFile("./pelis.json", pelis);
      return true;
    }
  }
  async search(peli: any): Promise<Peli[]> {
    const pelis = await this.getAll()
    
    if(peli.title && peli.tag){
      return pelis.filter((pel) =>{
        return (
          pel.title.includes(peli.title) && pel.tags.includes(peli.tag)
          );
      });
    } else if(peli.title){
      return pelis.filter((pel) => {
        return pel.title.includes(peli.title);
      });
    } else if(peli.tag){
return pelis.filter((pel) => {
  return pel.tags.includes(peli.tag);
})
    }
  }
}

export { PelisCollection, Peli };