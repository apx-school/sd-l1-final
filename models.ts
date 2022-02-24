import * as jsonfile from 'jsonfile'

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[]=[];
  constructor(){
  this.getAll().then(json => this.peliculas = json);
  }

  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json").then((res) => {
      return res;
    });
  }
  async getById(id:number):Promise<Peli>{
    const respuesta = await this.getAll().then( res => res.find( r => r.id == id ));
    return respuesta;
  }
  async search(options:any){
    if(options.title && options.tag){
      const primerFiltro =  this.getAll().then( (res)=>{
        return res.filter( (peli)=> {
          var peliMayus = peli.title.toUpperCase(); 
          return peliMayus.includes(options.title.toUpperCase());
        })
      })
      return await primerFiltro.then((res) => {
        return res.filter(  peli => peli.tags.includes(options.tag));
      })
    }
    else if(options.title){
      return await this.getAll().then( (res) =>{
        return res.filter( (peli) =>{
          var peliMayus = peli.title.toUpperCase(); 
          return peliMayus.includes(options.title.toUpperCase()); 
        })  
      })
    }else if(options.tag){
      return await this.getAll().then( (res) => {
        return res.filter(  peli => peli.tags.includes(options.tag));
      })
    }
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((peliculas)=>{
          peliculas.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", peliculas);
          return promesaDos.then(() => {
            return true;
          })
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection,Peli };
