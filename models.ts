import * as jsonfile from 'jsonfile';


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}


class PelisCollection {

  data: Peli[] = [];
  
  //Lee el archivo de peliculas y lo guarda en la propiedad data
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((archivoPeliculas) => {
      // la respuesta de la promesa

      return  this.data = archivoPeliculas; 
    });
  }

  //Busca una pelicula por id
  async getById(id:number){
    return this.getAll().then((peliculas) =>{
      return  peliculas.find(peli => peli.id == id);
    })
  }

    //Filtra peliculas segun parametros title, tag o ninguno (devuelve todas este ultimo)
  async search(options:any): Promise<Peli[]>{
    let resultadoPelis =  this.getAll();
    
    if(options.title){
       //resultadoPelis.filter(peli =>  peli.title.toLowerCase().includes(options.title));
       resultadoPelis = resultadoPelis.then((peliculas)=>{
        return peliculas.filter(peli =>  peli.title.toLowerCase().includes(options.title));
      })
    }

    if(options.tag){
     // resultadoPelis = resultadoPelis.filter(peli =>  peli.tags.find((tag) => {
          
      // return tag == options.tag}))
       resultadoPelis =  resultadoPelis.then((peliculas) => {
        return peliculas.filter(peli =>  peli.tags.find((tag) => {
          
         return tag == options.tag
        }));
      })
      
    }

   
    return resultadoPelis;
  }

  //agrega pelicula al archivo pelis en caso de que sea un id nuevo
  add(peli:Peli):Promise<boolean>{
    
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if(peliExistente){
          return false;
        }else {
          
           this.data.push(peli) ;
          
          const promesaDos = jsonfile.writeFile(__dirname + "/pelis.json",this.data);

          return promesaDos.then(()=>  true)
        }
    })
    return promesaUno;
  }
  
}




export { PelisCollection, Peli };
