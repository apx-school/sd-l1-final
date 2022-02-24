import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  datos: Peli[]
  constructor(){}
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      // la respuesta de la promesa
      return peliculas;
    });
  }
  getById(id: number) {
    return this.getAll().then((peliculas) => {
      const res = peliculas.find(p => {return p.id === id})
      return res
    })
  }
  search(options: any) {
    var newProp = Object.getOwnPropertyNames(options)[0].toLowerCase()
    var value = Object.values(options)[0]
    options = { [newProp]: value }
    
    if (options.title) {
      return this.getAll().then((peliculas) => {
        const res = peliculas.filter(p => {
          return p.title.includes(options.title)
        })
        return res
      })
    } else if (options.tag) {
      console.log("chau")
      return this.getAll().then((peliculas) => {
        const res = peliculas.filter(p => {
        return p.tags.includes(options.tag.toLowerCase())
      })
        return res
      })
    } else {
      throw "OPCIÓN NO VÁLIDA. OPCIONES VÁLIDAS: TITLE | TAG"
    }
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((idExiste) => {
      if (idExiste) {
        return false
      } else {
        this.getAll().then((peliculas) => {
          peliculas.push(peli)
          jsonfile.writeFile("./pelis.json", peliculas)
        })
        return true
      }
    });
    return promesaUno
  }
}
export { PelisCollection, Peli };
