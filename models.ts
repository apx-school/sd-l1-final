import * as jsonfile from "jsonfile"

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  // Trae todas las peliculas
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json")
  }
  // Trae la peli por su ID
  async getById(id:number){
    const data = await this.getAll();
    return data.find((i) => {
      return i.id == id
    })
  }
  // Busca pelis por title o por tag
  async search(options:any){
    const data = await this.getAll();
    if (options.title && options.tag){
      return data.filter((i) => {
        return i.title.includes(options.title) && i.tags.includes(options.tag)
      })
    }
    else if (options.title){
      return data.filter((i) => {
        return i.title.includes(options.title)
      })
    }
    else if (options.tag){
      return data.filter((i) => {
        return i.tags.includes(options.tag)
      })
    }
  }
  // Agrega pelis
  async add(peli: Peli) {
    const promesaUno = await this.getById(peli.id)
    if (promesaUno) {
      return false
    }
    else {
      const data = await this.getAll();
      data.push(peli)
      await jsonfile.writeFile("./pelis.json", data)
      return true
    }

}
}


export { PelisCollection, Peli };