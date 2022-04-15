import * as jsonfile from "jsonfile";


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
    promesa.then((res=>{
      return this.data = res;

    }))
    return promesa;
  }

  getById(id:number): Promise <any>{
    const promesaNueva =this.getAll().then(() =>{
       return this.data.find(item => item.id == id)
       
    })
    return promesaNueva;
    
        
      
    };

    search(options: any):Promise <any>{
      let promesa = this.getAll().then(() =>{
        let listaDePeliculas = this.data;
        for(const k in options){
          if(k == "title"){
           listaDePeliculas = listaDePeliculas.filter((pelicula =>{
              if(pelicula.title.search(options.title)>=0)
                return true;
              
            })); 
          }
          if(k == "tag"){
             listaDePeliculas = listaDePeliculas.filter((r =>{
              return(r.tags.includes(options[k]));
        }))
      }
      }
      return listaDePeliculas;
      })
      return promesa;
      
}
add(peli:Peli): Promise<any>{
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

