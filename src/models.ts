import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
//import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id!: number;
  title!: string;
  tags!: string[];
}
type SearchOptions  = {title?: string; tag?: string};
class PelisCollection {
  pelis: Peli[] = [];
  async add(peli:Peli):Promise<boolean> {
      const pelis = await this.getAll();

    const existe = pelis.find((p) => p.id === peli.id);
    if(existe){
      return false;
    }

    const NuevaData = [...pelis,peli];
     try {
    await jsonfile.writeFile("./pelis.json", NuevaData);
    return true;
  } catch (e) {
    // si falla la escritura, la promesa debe resolver en false
    return false;
  }
  }
  
  async getAll(): Promise<Peli[]> {
    try{
      const resp = await jsonfile.readFile("./pelis.json"); 
      return resp || [];
    }catch{
      return [];
    }
  }

  async getById(id:number):Promise<Peli | undefined > {
    const pelis = await this.getAll();
    return pelis.find((p) => p.id === id);
  }

  async search(options:SearchOptions): Promise <Peli[]>{
    const lista = await this.getAll();

    return lista.filter((p) => {
      let cumple = true;

      if(options.title){
        cumple =cumple && p.title.toLowerCase().includes(options.title.toLowerCase());
      }
      if(options.tag){
        cumple = cumple && p.tags.map(t => t.toLowerCase()).includes(options.tag.toLowerCase());
      }
      return cumple;
    });
  }

}
export { PelisCollection, Peli };
