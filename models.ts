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
    const answer =  await jsonfile.readFile(__dirname+"/pelis.json");
    return  answer;
  }

  async getById(id:number):Promise<Peli>{
    const answer = await  this.getAll().then( res =>{
      return res.find( r => r.id == id );
    } )
    return answer;
  }

  async search(options:any){
    if(options.title && options.tag){
      const firstFilter = await this.getAll().then( (res)=>{
        return res.filter( (peli)=> {
          return peli.title.includes(options.title);
        })
      })
      return firstFilter.filter( peli =>{
        if(peli.tags){
          if(peli.tags.includes(options.tag)){
            return true;
          }
        }
      }) 
    } else if(options.title) {
      return await this.getAll().then( (res) =>{
        return res.filter( peli =>  peli.title.includes(options.title) );  
      })
    } else if(options.tag) {
      const all = await this.getAll();
      return all.filter( peli =>{
        if(peli.tags){
          if(peli.tags.includes(options.tag)){
            return true;
          }
        }
      })
    }
  }

  add(peli: Peli): Promise<boolean> {
    const firstPromise = this.getById(peli.id).then((existingMovie) => {
      if (existingMovie) {
        return false;
      } else {
        return this.getAll().then((movie)=>{
          movie.push(peli);
          const secondPromise = jsonfile.writeFile("./pelis.json", movie);
          return secondPromise.then(() => {
            return true;
          })
        });
      }
    });

    return firstPromise;
  } 
}
export { PelisCollection,Peli };
