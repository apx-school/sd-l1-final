import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[]

  //metodo que carga el archivo json de peliculas
  getAll(): Promise<any> {
    const promesa = jsonfile.readFile("./pelis.json");
    promesa.then((data)=>{
    this.data = data
    })
    return promesa
  }

 //metodo que obtiene una pelicula segun su id
  getById(id:number){
    return this.getAll().then(()=>{
      return this.data.find((i)=> i.id == id)
    })
   
  }

  //metodo que filtra peliculas segun su titulo y sus tags 
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

 //metodo que agrega una pelicula a data y luego lo guarda en el json
 //si el id de la pelicula que se esta por agregar ya existe en el json devuelve false
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
    
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


  


