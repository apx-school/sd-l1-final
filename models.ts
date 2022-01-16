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
    const resultado = await this.getAll();
    
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

const pruebas = new PelisCollection();

/* const resultado = pruebas.getById(5).then((parametro)=>{
  console.log(parametro)
}) */


(async()=>{
  /*  const res = await pruebas.getAll()
  console.log("pruebas", res)  */
  /* const resp = await pruebas.getById(6)
  console.log(resp) */
  const rep = await pruebas.add({id:7,title: "Fargo", tags:["favorita", "de Coen brother's"]})
  return rep
})();