import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  };

  async getById(id: number): Promise <Peli> {
      const peliculas = await this.getAll();
      return peliculas.find((item) => {
        return item.id === id
      });
  }
      

  async search(options: any): Promise <any> {
    const films = await this.getAll();
    
    if (options.title && options.tag) {
        const buscaTitulos = films.filter((tituloPeli)=>{
        return tituloPeli.title.includes (options.title) && tituloPeli.tags.includes (options.tag)
})
    return buscaTitulos
}
    else if (options.title) {
        const tituloDev = films.filter((tituloPeli)=> {
            return tituloPeli.title.includes(options.title)
        } );
        return tituloDev
} 

else if (options.tag) {
    const tagDev = films.find ((tagPeli)=> {
      return tagPeli.tags.includes (options.tag)
    });
    return tagDev


  }};

  async add(peli: Peli): Promise <boolean> {
    const filmExist = await this.getById(peli.id);

      if (filmExist) {
        return false;
 }else { 
        const films = await this.getAll();
        films.push(peli)
        await jsonfile.writeFile ("./pelis.json", films)
          return true;
        }
      
   
} } 
    export { PelisCollection, Peli };
