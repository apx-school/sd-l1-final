import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((respuesta) => {
      return respuesta;
    });
  }
  
  getById(id:number){
    return this.getAll().then((p) => { 
        const resultado = p.find ((r) => {if (r.id == id ){return r}} )
        return resultado
    })
}

//debe recibir -> search --title = "a"

  search (options:any)  {
  return this.getAll().then((pelis) => {

    if (options.title && options.tag )

    {return pelis.filter((p)=>{
      return p.title.includes(options.title) && p.tags.includes(options.tag) })
     }

    else  if (options.title){return pelis.filter ((p) =>{return p.title.includes(options.title)})}
     else if (options.tag){return pelis.filter((p) => {return p.tags.includes(options.tag)})}

  })

  }

 //debe recibir -> --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic
 
  add(peli:Peli){
   
    return this.getById(peli.id).then((peliExistente) => { 
      if(peliExistente){return false}

      else {return this.getAll().then((p) => { p.push(peli)
      return jsonfile.writeFile("./pelis.json", p).then(()=>{
        return true
      })
      } ) }
    })
  }
}
export { PelisCollection, Peli };



// function main (){
//   const objeto = {tags: "Fantasía"}
//   const prod = new PelisCollection()
//   prod.search(objeto).then ((p)=>{console.log (p)})
  
  
//   }


// main()

// function main (){
//   const objetoPeli = {
//     id :57,
//     title: "Los pajaros",
//     tags: ["Misterio"]
//   }

// const prueba = new PelisCollection()
// prueba.add(objetoPeli).then((p)=>{
//   console.log (p)
// })

// }

// main()