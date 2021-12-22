import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}
class PelisCollection {
 
  getAll(): Promise<Peli[]> {
    return  jsonfile.readFile("./pelis.json").then((res) =>{return res});
  }
  getById(id:number):Promise<any>{
    return this.getAll().then((pelis)=>{
      const getPeli = pelis.find((p)=>p.id ==id)
      return getPeli;
    });
  }
  search(options:any): Promise<any>{
    return this.getAll().then((pelis)=> {
      if (options.title && options.tags) {
        return pelis.filter((pel) => { 
          return pel.title.includes(options.title) && 
          pel.tags.includes(options.tags); });
      } 
       if (options.title) {
        return pelis.filter((pel_1) => {
          return pel_1.title.includes(options.title); });
      }
      if (options.tags) {
        return pelis.filter((pel_2) => { 
         return pel_2.tags.includes(options.tags); });
      }  
    });
  }
  
  add ( peli: Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.getAll().then((json)=> {
          json.push(peli)
          return jsonfile.writeFile("./pelis.json", json).then((res)=> true);
        })
      };
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };