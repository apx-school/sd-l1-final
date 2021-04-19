import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];

  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json").then((res =>{
      return this.data = res;
    }))
    return promesa;
  };


  getById(id:number){
    const promesaDos = this.getAll().then(() =>{
      const encontrado = this.data.find(item => item.id == id);
      return encontrado;
  });
  return promesaDos;
}
search(options: any){
let promise = this.getAll().then(()=>{
  let listaDePeliculas = this.data;
  for (const k in options){
    if(k == "title"){
      listaDePeliculas = listaDePeliculas.filter((pelicula =>{
        if(pelicula.title.search(options.title)>= 0)
        return true;
      
      }));
    }
    if(k == "tag"){
      listaDePeliculas = listaDePeliculas.filter((r =>{
        return (r.tags.includes(options[k]));
      }))
    }
  }
  return listaDePeliculas;
})
return promise;
}

add(peli:Peli): Promise<any>{
  let promesa = this.getAll().then(() =>{
    let peliBuscada = this.data.find(e => e.id == peli.id);
    if(peliBuscada == undefined){
      this.data.push(peli);
      jsonfile.writeFile("./pelis.json", this.data);
      return true;
    }else {
      return false;
    }
  });
  return promesa;
}
}

export { PelisCollection, Peli };
