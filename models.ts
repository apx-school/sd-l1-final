import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
//se agregan métodos asincrónicos a la clase 
class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const promesa = await jsonfile.readFile("./pelis.json")
      // la respuesta de la promesa
  return promesa
  }
  async getById(id:number){
    const resultado = await this.getAll()
    return resultado.find((peli)=>{ return peli.id == id})
  }

  async search(options:any){
    var result = await this.getAll();
     if (options.title && options.tag) {  
     var filter = result.filter((peli)=>{
       return peli.title.includes(options.title)&&
        peli.tags.includes(options.tag)
     })
     return result = filter
    }
    else if (options.title){
      var filterTitle = result.filter((peli)=>{ 
        return peli.title.includes(options.title)})
        return result = filterTitle
    }
    else if (options.tags){
       var filterTags = result.filter((peli)=>{
         return peli.tags.includes(options.tag)})
      return result = filterTags
       }

     return result
  }

    add(peli: Peli): Promise<boolean> {
    return this.getAll().then((json)=>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = json
        data.push({id: peli.id,
          title: peli.title,
          tags: peli.tags})
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
 
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  })
}
}

  

export { PelisCollection, Peli };
