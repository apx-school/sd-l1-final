import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string }

class PelisCollection {
  moviesCollection:Peli[]
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((resp) => {
      // la respuesta de la promesa
     // const respuesta= resp
       this.moviesCollection=resp
      //console.log(this.moviesCollection)
     return this.moviesCollection

    });
  }
  async GEtById(id:number):Promise<Peli>{
    
    const obj=await this.getAll()
    const resp= obj.find(res=>res.id==id)
    //console.log(resp)
    return resp
    
   }
   add(peli:Peli):Promise<boolean> {
    const promesaUno = this.GEtById(peli.id).then((peliExistente)=>{
     if(peliExistente){
        return false
      }else{
        return this.getAll().then(()=>{
       this.moviesCollection.push(peli);
         return jsonfile.writeFile("./pelis.json",this.moviesCollection).then(()=>{
          return true
        })
        })
      
   }})
    
     return   promesaUno
}
    async search(options:SearchOptions){
      const lista = await this.getAll();
      const listaFiltrada= lista.filter((a)=>{
        
        if(options.title){
          return a.title.toLowerCase().includes(options.title)
          
        }
        if(options.tag){
          const resp= a.tags.includes(options.tag)
          return resp 
        }
        if(options.tag && options.title){
          return a.title.includes(options.title)&& a.tags.includes(options.tag) 
        }
      
    })
//console.log(listaFiltrada)
return listaFiltrada



    }

}

//const prueba= new PelisCollection 
//prueba.getAll()
//prueba.GEtById(1)
// prueba.add({
//  id: 4,
//  title: 'Bourne "la supremacia"',
//  tags: [ 'Accion', 'Vetereano', 'asesinatos', 'Violencia' ]
//})
//prueba.search({title:'p'})


export { PelisCollection, Peli };
