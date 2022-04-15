import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json")
      .then((res) => {
        return res;
    })
  }
  getById(id:number){
  return  this.getAll().then((res) => {
     const peliEncontrada = res.find((item:Peli) => 
         item.id == id );
      return peliEncontrada;
    })
  }
  search(options: any){
  return  this.getAll()
      .then((res) => {
        if(options.title && options.tag){
         return res.filter((item) => 
          item.title.includes(options.title) && item.tags.includes(options.tag)
          );
        }
        if(options.title){
        return  res.filter((item) =>
          item.title.includes(options.title)
          ); 
        }
        if(options.tag){
          return res.filter((item) =>
            item.tags.includes(options.tag)
          );
        }
      })
  }
  add(peli:Peli){
  return this.getById(peli.id).then(res => {
    const existe = res; 
    if(res){
      return false
    }else{
      return this.getAll().then(res => {
        res.push(peli);
        return jsonfile.writeFile("./pelis.json", res).then(() => true);
      })
    }
  })
}
}


export { PelisCollection, Peli };

