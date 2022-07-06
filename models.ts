import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }
  getById(id: number) {
    const peliById = this.getAll().then((pelis) => {
      const resultado = pelis.find((p) => {
        return p.id == id;
      });
      return resultado;
    });
    return peliById;
  }
  async search(options: any) {
    const todasLasPelis = await this.getAll();
    if(options.title && options.tag){
      const respuesta = todasLasPelis.filter((pelis)=>{
        return pelis.title.toLowerCase().includes(options.title.toLowerCase()) && pelis.tags.includes(options.tag.toLowerCase())
      })
      return respuesta
    }
  else if (options.title) {
      const respuesta = todasLasPelis.filter((pelis) => {
        return pelis.title.toLowerCase().includes(options.title.toLowerCase());
      });
      return respuesta;
    }
  else if (options.tag) {
      const respuesta = todasLasPelis.filter((pelis) => {
        return pelis.tags.includes(options.tag.toLowerCase());
      });
      return respuesta;
    };

    
  }
}

//mock (prueba de métodos del models)
const objeto = new PelisCollection();
// objeto.getById(3).then((p) => {
//   console.log(p);
// });
// objeto.search({ title: "VOLver" });
// objeto.search({ tag: "InformatiCa" });
objeto.search({ tag: "drama", title: "tita" }).then((peli)=>{
  console.log(peli)
})


export { PelisCollection, Peli };
