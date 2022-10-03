import * as jsonfile from "jsonfile"

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  // Trae todas las peliculas
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json")
  }
  // Trae la peli por su ID
  getById(id:number){
    return this.getAll()
        .then((pelis) => {
            const result = pelis.find((i) => {
                return i.id == id
            })
            return result
        })
  }
  // Busca pelis por title o por tag
  search(options:any){
    return this.getAll()
    .then((result) => {
      const resultado = result
      if (options.title){
        return resultado.filter((p) =>{
          return p.title.toLowerCase().includes(options.title.toString().toLowerCase())
        })
      }
      if (options.tag){
        return resultado.filter((p) => {
          return p.tags.includes(options.tag);
        })
      }
      return resultado
    })
  }
  // Agrega pelis
  add(peli: Peli) {
    const promesaUno = this.getById(peli.id)
    .then((peliTrue) => {
      if (peliTrue) {
        return false;
      } else {
        this.getAll().then((pelis) => {
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis);
        });
        return true;
      }
    });
}
}

// Test Belu
/*
const test = new PelisCollection()
const unaPeli = new Peli()
unaPeli.id = 888,
unaPeli.title = "la peli de prueba"
const opt = {
  tag: "disney",
  title: "fro"
}

test.search(opt)
.then((r) =>{
  console.log(r)
})
*/

export { PelisCollection, Peli };
