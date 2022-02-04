import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile("/pelis.json").then((peliculas) => {
      // la respuesta de la promesa
      return [peliculas];
    });
  }
  getById(id: number): Promise<any> {
    return this.getAll().then((listaPelis) => {
      const devolucion = listaPelis.find((peliConId) => {
        return peliConId.id == id;
      });
      return devolucion;
    });
  }
  search(options: any): Promise<any> {
    return this.getAll().then((listaPelis: any) => {
      var listaModificada = listaPelis;
      if (options.title) {
        listaModificada = listaModificada.filter((peli) => {
          return peli.title.includes(options.title);
        });
      }
      if (options.tag) {
        listaModificada = listaModificada.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
        return listaModificada;
      }
    });
  }
  add(peli: Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente)=>{
      if (peliExistente) {
        return false
      }else{
        const data = this.getAll().then((res)=>{
          return res.push(peli)
        })
        const promesaDos = jsonfile.writefile("./pelis.json", data)
        return promesaDos.then(()=>{
          return true
        })
})
return promesaUno
}
}
}



const coleccionPeliculas = new PelisCollection();
coleccionPeliculas.getAll().then((resultado) => {
  console.log(resultado);
});
export { PelisCollection, Peli };
