import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}
class PelisCollection {
  pelis: Peli [] = [];
  getPelis(){
    return jsonfile.readFile("./pelis.json");
  }
  getAll(): Promise<Peli[]> {
    return this.getPelis().then((res) => console.log(res));
  }
  getById(id:number){
    return this.getPelis().then((pelis)=>{
      const getPeli = pelis.find((p)=>p.id ==id)
      return getPeli;
    });
  }
  search(options:any): Promise<any>{
    return this.getAll().then((pelis)=> {
      if (options.title && options.tags) {
        return pelis.filter((pel) => { pel.title.includes(options.title) && pel.tags.includes(options.tags); });
      } else if (options.title) {
        return pelis.filter((pel_1) => { pel_1.title.includes(options.title); });
      } else if (options.tags) {
        return pelis.filter((pel_2) => { pel_2.tags.includes(options.tags); });
      }  
    });
  }
  
  add ( Peli: Peli): any{
    const promesaUno = this.getById(Peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = jsonfile.writeFile("./pelis.json", Peli);
        return promesaDos.then((res) => {
          res.push(Peli);
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };

// if(options.params === "title" && options.data.title){
//  result = this.getPelis().then((pelis)=>{
//     const getPelis = pelis.filter((pelis)=>{pelis.title == options.data.title})
//     return getPelis;
//   }) 
// }else if (options.params === "tag" && options.data.tags) {
//   result = this.getPelis().then((pelis)=>{
//     const getPelis = pelis.filter((pelis)=>{pelis.tags == options.data.tags})
//     return getPelis;
//   });
//  } return result;
