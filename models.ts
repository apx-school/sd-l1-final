import { readFile, writeFile } from "jsonfile"

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number
  title: string
  tags: string[]
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const pelisFromJSON = await readFile(__dirname + 'pelis.json')
    return pelisFromJSON
  }
  async getOneById(id: number): Promise<Peli> {
    const pelisFromJSON = await this.getAll()
    return pelisFromJSON.find(e => e.id == id)
  }
  async search(options: any): Promise<Peli[]> {
    const pelisFromJSON = await this.getAll()
    if (options.title && options.tags) {
      const filteredByTitle = pelisFromJSON.filter(e => e.title.includes(options.title))
      const filteredByTag = filteredByTitle.filter(e => e.tags.includes(options.tags))
      return filteredByTag
    } else if (options.title) {
      return pelisFromJSON.filter(e => e.title.includes(options.title))
    } else if (options.tags) {
      return pelisFromJSON.filter(e => e.tags.includes(options.tags))

      // } else {
      //   return pelisFromJSON
    }
  }
  async add(peli: Peli) {
    const pelisFromJSON = await this.getAll()
    const yaExiste = pelisFromJSON.find(e => e.id == peli.id)

    if (!yaExiste) {
      pelisFromJSON.push(peli)
      await writeFile(__dirname + '/pelis.json', pelisFromJSON)
      return true
    } else {
      return false
    }
  }
}

(() => {
  const model = new PelisCollection()

  console.log(model.getAll())

})()
export { PelisCollection, Peli }
