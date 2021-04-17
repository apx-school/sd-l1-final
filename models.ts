import * as jsonfile from "jsonfile";
import { constants } from "node:buffer";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
class PelisCollection {
  data: Peli[] = [];
  
  getAll():Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json");
    promesa.then((json =>{
      this.data = json;
      
    }));

   return promesa;
  }

  getById(id){
    const promesaNueva =this.getAll().then(() =>{
       return this.data.find(item => item.id == id)
    })
      return promesaNueva;
    };

  search(options: any){
    const promesa = this.getAll().then(() =>{
      let listaDePeliculas = this.data
      for(const key in options){
        if(key == "title"){
          listaDePeliculas = listaDePeliculas.filter(function (pelicula){
              if(pelicula.title.search(options.title)>=0){
                return true;
              }
            });
    }
    if(key == "tag"){
      listaDePeliculas = listaDePeliculas.filter((n) =>{
        if(n.tags.includes(options[key]))
        {
          return true;
        }
      });
      
    };
    
  }
  return listaDePeliculas;
})
return promesa;
}
  add(peli:Peli){
    let promesa = this.getAll().then(() =>{
      let encontrado = this.data.find(n => n.id == peli.id);
      if(encontrado == undefined){
        this.data.push(peli);
        jsonfile.writeFile("./pelis.json", this.data);
        return true;
      }else{
        return false;
      }
      
    })
     return promesa;
  }

  
}
export { PelisCollection, Peli };