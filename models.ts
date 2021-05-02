import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli [] = [];
  

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return this.pelis = pelis;
    });
  }

  getById(id:number){
    return this.getAll().then((pelis)=>{
      return pelis.find((peli)=>{
        return peli.id == id;
      });
    });
  }

  search(options: any):Promise <any>{
    let promesa = this.getAll().then(() =>{
      let listaDePeliculas = this.pelis;
      for(const option in options){
        if(option == "title"){
         listaDePeliculas = listaDePeliculas.filter((pelicula =>{
            if(pelicula.title.toLowerCase().search(options.title)>=0)
              return true;

          })); 
        }
        if(option == "tag"){
           listaDePeliculas = listaDePeliculas.filter((r =>{
            return(r.tags.includes(options[option]));
      }))
    }
    }
    return listaDePeliculas;
    })
    return promesa;

}
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.pelis.push(peli);
        const data = this.pelis;
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