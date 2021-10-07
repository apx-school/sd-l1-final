import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json");
  };
  getById(id:number){
    this.getAll().catch(err=>console.log(err));
    return this.getAll().then(all=>{return all.find(peli=>peli.id == id)});
  }; 
  search(options:any){
    this.getAll().catch(err=>console.log(err))
    return this.getAll().then(all=>{
      if(options.title){
        return all.filter(peli=>peli.title.toUpperCase().includes(options.title.toUpperCase()))
      }else if (options.tag){
        return all.filter(peli=>{return peli.tags.map(tag=>tag.toUpperCase()).includes(options.tag.toUpperCase())})
      };
    })
  };
  add(peli:Peli):Promise<boolean>{
     const promesaUno = this.getById(peli.id).then(peliExistente=>{
      if(peliExistente){
        return false
      } else {
        const added = this.getAll().then(all=>{let rtta=all; rtta.push(peli);return rtta});
        const promesaDos = added.then (rtta=>jsonfile.writeFile("./pelis.json",rtta))
        return promesaDos.then(()=>true)
      };
    })
    return promesaUno

  }

};
export { PelisCollection, Peli };
