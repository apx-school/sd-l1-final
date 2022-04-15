import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];

  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((datos) => {
    
      return (this.data = datos);
    });
  }

  getById(id: number){
    const searchById = this.getAll().then((pelis)=>{
      return pelis.find((item)=> {
        return item.id == id;
      });

    });
    return searchById;
      
  }

  search(options: any) {
    return this.getAll().then((pelis) => {
      return pelis.filter((r) => {
        if (options.title && options.tag) {
          return (
            r.title.includes(options.title) &&
            r.tags.includes(options.tag.toString())
          );
        } else if (options.title) {
          return r.title.toLowerCase().includes(options.title);
        } else if (options.tag) {
          return r.tags.includes(options.tag.toString());
        } else {
          return this.getAll();
        }
      });
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const data = this.data;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
  
}
export { PelisCollection, Peli };
