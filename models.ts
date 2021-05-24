import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[];

  getAll(): Promise<Peli[]> {
   
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return this.pelis = pelis;
    });
  };
  getById(id:number){
    return this.getAll().then((pelis)=>{
      const resultado = pelis.find((peli)=>{
        return peli.id == id;
        });
      return resultado;
    });
  };
  search(options:any){
    return this.getAll().then((pelis)=>{
      var respuesta = pelis;

      if (options.title){
        respuesta = respuesta.filter((peli)=>{
          return peli.title.includes(options.title);
        });
      };
      if (options.tag){
        respuesta = respuesta.filter((peli)=>{
          return peli.tags.includes(options.tag);
        });
      }; 
      return respuesta;
    });

  }
  add(peli: Peli):Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente)=>{
      if (peliExistente){
        return false;
      }else{
        this.pelis.push(peli);
        const data = this.pelis;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(()=>{
          return true;
        });
      }
    });
    return promesaUno;

  }
};
export{Peli,PelisCollection}
