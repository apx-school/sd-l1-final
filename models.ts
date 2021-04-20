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
     return jsonfile.readFile("./pelis.json").then((res =>{
      return this.data = res;
      })).catch((err =>{
        return err;
      }))
  };


  getById(id:number){
    let promesaDos = this.getAll().then(() =>{
      return  this.data.find(item => item.id == id);
  }).catch((er=>{
    return er;
  }))
  return promesaDos;
}
search(options: any): Promise<Peli[]>{
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
}).catch((eerr=>{
  return eerr;

}))
return promise;
}

add(peli:Peli): Promise<Peli[]>{
  let promesa = this.getAll().then(() =>{
    let peliBuscada = this.data.find(e => e.id == peli.id);
    if(peliBuscada == undefined){
      this.data.push(peli);
      return jsonfile.writeFile("./pelis.json", this.data).then(()=>{
        return true;
      });
    }else {
      return false;
    }
  }).catch((errorr=>{
    return errorr;

  }))
  return promesa;
}
}

export { PelisCollection, Peli };

