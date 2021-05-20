import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  data:Peli[]=[]
  
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((datos) => {
      // la respuesta de la promesa
      return this.data = datos;
    });
  }



  getById(id:number):Promise<any>{
    const resultado =  this.getAll().then((p)=>{
      const resp =  p.find((e)=>{
        return e.id == id
      })
      return resp
    
    })

    return resultado
  }


  search(options:any):Promise<any>{
    
    
    
    return  this.getAll().then((datos)=>{
         return  datos.filter((e)=>{
          var resultados 

          if(options.title && options.tag){
            resultados = e.title.includes(options.title)&& e.tags.includes(options.tag)
          }  
          else if(options.title){
              resultados= e.title.includes(options.title)
                  
          }else if(options.tag){
              resultados = e.tags.includes(options.tag)
                       
          } 
               

            return resultados
          })

          
    })
    
      

    
  }




  add(peli:Peli):Promise<boolean> {
      const primerRespuesta = this.getById(peli.id).then((peliExistente)=>{
        if(peliExistente){
          return false
        }else{
         
            this.data.push(peli)
          const segundaRespuesta = jsonfile.writeFile("./pelis.json", this.data)
           return segundaRespuesta.then(()=>{
            return true
          })
        }
        
      })

      return primerRespuesta
  }

  
}
export { PelisCollection, Peli };

