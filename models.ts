import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
  director:string;
  year:number;
}

class PelisCollection {

  async getAll(): Promise<Peli[]> {
    const respuestaDelArchivo = await jsonfile.readFile("./pelis.json")
      return respuestaDelArchivo;
  }

  async getById(id:number){
    const resultado = await this.getAll();
    const respF = resultado.find((p)=>{return p.id == id})
    return respF
  }



}
export { PelisCollection, Peli };

const pruebas = new PelisCollection();

/* const resultado = pruebas.getById(5).then((parametro)=>{
  console.log(parametro)
}) */


(async()=>{
  /*  const res = await pruebas.getAll()
  console.log("pruebas", res)  */
  const resp = await pruebas.getById(4)
  console.log(resp)
})();