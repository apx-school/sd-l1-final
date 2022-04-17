import * as jsonfile from 'jsonfile';

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
    const respuesta =  await jsonfile.readFile(__dirname+"/pelis.json");
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
          return peli.title.includes(options.title);
        })
      })
      return primerFiltro.filter( peli =>{
        if(peli.tags){
          if(peli.tags.includes(options.tag)){
            return true;
          }
        }
      }) 
    }
    else if(options.title){
      return await this.getAll().then( (res) =>{
        return res.filter( peli =>  peli.title.includes(options.title) );  
      })
    }else if(options.tag){
      const todas = await this.getAll();
      return todas.filter( peli =>{
        if(peli.tags){
          if(peli.tags.includes(options.tag)){
            return true;
          }
        }
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
