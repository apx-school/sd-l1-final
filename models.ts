import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
  constructor(){
    this.getAll().then(json => this.peliculas = json);
  }

  async getAll():Promise<Peli[]>{
    const respuesta =  await jsonfile.readFile(__dirname+"/pelis.json").then((res) => {
      return res;
    });
    return  respuesta;
  }
  async getById(id:number):Promise<Peli>{
    const respuesta = await  this.getAll().then( res =>{
      return res.find( r => r.id == id );
    } )
    return respuesta;
  }
  async search(options:any){
    if(options.title && options.tag){
      const primerFiltro = await this.getAll().then( (res)=>{
        return res.filter( (peli)=> {
          var peliMayus = peli.title.toUpperCase(); 
          return peliMayus.includes(options.title.toUpperCase());
        })
      })
      return primerFiltro.filter( peli => this.verificarLosTags(peli.tags,options.tag) );
    }
    else if(options.title){
      const title = options.title + "";
      return await this.getAll().then( (res) =>{
        return res.filter( (peli) =>{
          var peliMayus = peli.title.toUpperCase(); 
          return peliMayus.includes(title.toUpperCase()); 
        })  
      })
    }else if(options.tag){
      return await this.getAll().then( (res) => {
        return res.filter(peli => this.verificarLosTags(peli.tags,options.tag) );
      })
    }
  }
   verificarLosTags(todosLosTags,tag):boolean {
     const tagEnMayuscula = (tag+"").toUpperCase();
    if (todosLosTags){
      const obj = todosLosTags.map( p => p.toUpperCase() );
      if ( obj.includes(tagEnMayuscula) )  return true;            
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
