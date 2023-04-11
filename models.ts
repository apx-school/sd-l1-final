import * as jsonfile from 'jsonfile'

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number
  title: string
  tags: string[]
}

class PelisCollection {
  peli: Peli[] = []

  getAll(): Promise<Peli[]> {
    return jsonfile
      .readFile(__dirname + '/pelis.json')
      .then((pelis: Peli[]) => {
        this.peli = pelis
        return this.peli
      })
  }

  async getById(id: number) {
    let biblioteca = await jsonfile.readFile('./pelis.json')
    let pelicula = biblioteca.find((peli) => peli.id === id)
    return pelicula
  }

  async search(option: any): Promise<Peli[]> {
    const listaCompleta = await this.getAll()

    const peliEncontrada = listaCompleta.filter((lista) => {
      let validacion = false

      if (option.tag && option.title) {
        if (
          lista.tags.includes(option.tag) &&
          lista.title.includes(option.title)
        ) {
          validacion = true
          return lista
        }
      } else if (option.tag) {
        if (lista.tags && lista.tags.includes(option.tag)) {
          validacion = true
          return lista
        }
      } else if (option.title) {
        if (lista.title && lista.title.includes(option.title)) {
          validacion = true
          return lista
        }
      }

      return validacion
    })

    return peliEncontrada
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false
      } else {
        return this.getAll().then(() => {
          this.peli.push(peli)
          const promesaDos = jsonfile.writeFile('./pelis.json', this.peli)
          return promesaDos.then(() => {
            return true
          })
        })
      }
    })
    return promesaUno
  }
}

export { PelisCollection, Peli }
