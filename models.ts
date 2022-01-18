import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data:Peli[]
  async getAll(): Promise<Peli[]> {
    const respuestaDelArchivo = await jsonfile.readFile("./pelis.json")
      return respuestaDelArchivo;
  }

  async getById(id:number){
    const resultado = await this.getAll();
    const respF = resultado.find((p)=>{return p.id == id})
    return respF
  }

  async search(options:any){
    const todasLasPelis = await this.getAll();
    if (options.title && options.tag){
      const res = todasLasPelis.filter((p)=>{
        return p.title.includes(options.title) && p.tags.includes(options.tag);
      })
      return res
    }else if (options.title){
      return todasLasPelis.filter((p)=>{
        return p.title.includes(options.title)
      });
    }else if (options.tag){
      return todasLasPelis.filter((p)=>{
        return p.tags.includes(options.tag)
      })
    }
  }

  add(peli:Peli): Promise<boolean>{

    return this.getAll().then((json)=>{
      return this.getById(peli.id).then((peliExistente)=>{
        if (peliExistente){
          return false;
        }else{
          json.push(peli);
          return jsonfile.writeFile("./pelis.json", json).then((resp)=> true)
        };
      })
    });
  };
}

export { PelisCollection, Peli };

//const pruebas = new PelisCollection();

/* const resultado = pruebas.getById(5).then((parametro)=>{
  console.log(parametro)
}) */


/* (async()=>{
  /* //test de getAll
  /*  const res = await pruebas.getAll()
  console.log("pruebas", res)  */
  //test de getById
  /* const resp = await pruebas.getById(14)
  console.log(resp) */
  //test de add
  /* const rep = await pruebas.add({id:20,title: "Shrek", tags:["animacion", "fantasia"]})
  return rep */
  //test de search
  /* const resp = await pruebas.search({title:"S"})
  console.log(resp) */ 
//})(); 