import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[]
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data) => {
      this.data = data
      return data 
    });
  }

  getById(id:number){
    return this.getAll().then(()=>{
      return this.data.find((i)=> i.id == id)
    })
  }
  search(options:any){
    return this.getAll().then((pelis)=>{
      let tmp = pelis
      if (options.title) {
        tmp = tmp.filter((i)=>i.title.includes(options.title))
      } if (options.tag){
        tmp = tmp.filter((i)=> i.tags.includes(options.tag))
      }
      return tmp
    })
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
       this.data.push(peli)
        const data = this.data
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };

// const params = {
//   title: "el",
//   tags: "aventura"
// }
// const peli = {
//   id: 10,
//   title: "peli nueva 2",
//   tags: ["accion", "aventura"]
// }
// const mock = new PelisCollection()
// mock.getAll().then(()=>{
// const resultado = mock.add(peli)
// resultado.then(()=>{
//   console.log(mock.data);
  
// })
  
// })


