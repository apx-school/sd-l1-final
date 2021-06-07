import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}


class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((dat) => {
      this.data = dat
      return dat
      
    });
    
  }
  getById(id: number) {
    return this.getAll().then((pelis) => {
      return pelis.find((pel)=>{
        return pel.id == id
      }); 
    });
     
  }
  search(options: any) {
  const ser = this.getAll().then((d) => {
    if(options.title && options.tag){
      return d.filter((dd)=> dd.title.includes(options.title) && dd.tags.includes(options.tag));

    } else if (options.title){
      return d.filter((dd)=> dd.title.includes(options.title));
    }if (options.tag) {
      return d.filter((dd) => dd.tags.includes(options.tag)) 
  }
  });
  return ser;
  
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}
export { PelisCollection, Peli };












