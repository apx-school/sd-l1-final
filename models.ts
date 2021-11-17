import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json")
  }

  async getById(id:number): Promise<Peli>{
    return await this.getAll().then(peliculas => {
      return peliculas.find(p => p.id == id)
    } )
  }
  
  async search(options:any):Promise<any>{
    //{title: "a"}
    if (options.title && options.tag) {
      return await this.getAll().then(pelis =>{
        return pelis.filter((p) =>p.title.includes(options.title) && 
            p.tags.includes(options.tag) )
      })}
    if (options.title) {
      return await this.getAll().then(pelis =>{
        return pelis.filter(p =>p.title.toLocaleLowerCase().includes(options.title))
      })
    }else if (options.tag){
      return await this.getAll().then(pelis =>{
        return pelis.filter(p => p.tags.includes(options.tag))
      })
    }
    }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = await this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then(data => {
          data.push(peli)
        return jsonfile.writeFile("./pelis.json", data) 
        }) 
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    
    return promesaUno;
  }
}
export { PelisCollection, Peli };


/*
async function mainModels() {
  const aux = new PelisCollection()
  const resultado = await aux.add({id: 109, title: "lm", tags:["terror"]})
  console.log(resultado);
  
}
mainModels()
  */      
        





    
        
    

  
    