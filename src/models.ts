import * as jsonfile from "jsonfile";
import "./pelis.json";
import * as path from "path";

type OptionsSearch = {title?: string, tag?: string};

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const lista = await jsonfile.readFile(path.resolve(__dirname, "./pelis.json"));
    return lista;
  };

  async getById(id: number){
    const lista = await this.getAll();
    const peliEncontrada = lista.find((peli) => id == peli.id);
    return peliEncontrada;
  };

  async add(peli: Peli){
    const lista = await this.getAll();
    const peliEncontrada = lista.find((element) => element.id == peli.id)

    if (peliEncontrada){
      console.log("esta peli ya existe");
      return false
    } else {
      const peliNueva = {
        id: peli.id,           
        title: peli.title,      
        tags: peli.tags         
      };

      lista.push(peliNueva)
      
      await jsonfile.writeFile(
        path.resolve(__dirname,"./pelis.json"), lista, {spaces: 2}
      );

      return true;
    };
  };

  async search(options: OptionsSearch){
    const lista = await this.getAll();//busco la lista

    if (options.title && options.tag){
      const lista1 = lista.filter((peli) => 
      peli.title.toLowerCase().includes(options.title.toLowerCase()) && 
      peli.tags.some((tag)=> tag.toLowerCase().includes(options.tag.toLowerCase())));
      return lista1;//si tiene title y tag

    } else if (options.title){
      const lista2 = lista.filter((peli) => 
        peli.title.toLowerCase().includes(options.title.toLowerCase()));
      return lista2;//si tiene solo title

    } else if (options.tag) {
      const lista3 = lista.filter((peli)=>
        peli.tags.some(tag => tag.toLowerCase().includes(options.tag.toLowerCase())));
      return lista3;//si tiene solo tag
    };

  };
}

export { PelisCollection, Peli };