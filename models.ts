import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((a) => {
      return (a);
    });
  }

  getById(id:number){
   return this.getAll().then((a) => {
       const r = a.find(resultado => {
       return resultado.id == id
      })
      return r;
    })
  } 
  search(options:any){
    if (options.title && options.tags){
      return this.getAll().then((j) => {
        return j.filter((r) => {
          return r.title.includes(options.title) && r.tags.includes(options.tags);
        });
      });
    } else if (options.title){
      return this.getAll().then((r) => {
        return r.filter((t) => {
          return t.title.includes(options.title);
        });
      });
    } else if (options.tags){
      return this.getAll().then((r) => {
        return r.filter((t) => {
          return t.tags.includes(options.tags);
        });
      });
    }
  }
  add(peli:Peli): Promise<boolean> {
    const primerPromesa = this.getById(peli.id).then((idPeliRepetido) => {
      if (idPeliRepetido){
        return false;
      } else {
        const segundaPromesa = this.getAll().then((it) => {
          it.push(peli)
          return jsonfile.writeFile("./pelis.json", it)
        })
        return segundaPromesa.then(() => {
          return true
        })
      }
    })
    return primerPromesa;
  }  
}
export { PelisCollection, Peli }