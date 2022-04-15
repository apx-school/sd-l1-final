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
 add(peli:Peli): Promise<boolean>{
  const promesaUno = this.getById(peli.id).then((pe)=>{
    if(pe){
      return false;
    }else{
      let datos;
       this.data.push(peli);
       datos = this.data;
      const promesaDos = jsonfile.writeFile("./pelis.json", datos);
      return promesaDos.then(()=>{
        return true;
      });
    }
  })
  return promesaUno;
}
      
}
         
export { PelisCollection, Peli };