import { promises } from "dns";
import { PelisCollection, Peli } from "./models";

type Options = {
 id?: number;
  title?:string;
  tag?: string;
}
class PelisController {
  private model : PelisCollection;
  private pelis: Peli[]= []

  constructor() {
    this.model = new PelisCollection()
  };

  getAllPelis():Promise<Peli[]> {
    return this.model.getAll();
  }
  getOne(options: Options): Peli | undefined {
    return this.get(options)[0];
  }
  async get(options: Options): Promise<Peli[]> {
    
    return this.model.search(options); 
  }
  async add(id:number, title:string, tags:string[]): Promise<boolean> {
    
    const existe = this.pelis.find((p) => p.id === id);
    if (existe) {
      return false;
    }

    const nuevaPeli : Peli ={ id,title, tags}
    this.pelis.push(nuevaPeli);

    return true; 
  }
  
  async search(options : Options={}){
    const lista = await this.getAllPelis() 
    if (!options.id && !options.title && !options.tag) {
      return lista; 
    }
    if (options.id){
      const peli = lista.find((p)=> p.id ===options.id)
      return peli?[peli] : []
    }
    const { title, tag} = options;
    
    const listaFiltrada = lista.filter((p)=>{
    let coincide = true;
    
    if (title) {
      coincide = coincide && p.title.includes(title);
    }
    if (tag) {
      coincide = coincide && p.tags.includes(tag);
    }
    
    return coincide;
  })
  return listaFiltrada
};
}
  
  
export { PelisController };
