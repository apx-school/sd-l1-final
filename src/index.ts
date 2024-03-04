import minimist from "minimist"
import { PelisController } from "./controllers"

// Instancia del controlador de películas
const controller = new PelisController()

// Función para analizar los parámetros de la línea de comandos
function parseaParams(argv) {
  const resultado = minimist(argv)

  const action = resultado._[0]
  const id = resultado.id || resultado._[1]
  const title = resultado.title || ""
  const tags = resultado.tags ? (Array.isArray(resultado.tags) ? resultado.tags : [resultado.tags]) : []

  return {
    action,
    params: { id, title, tags },
  }
}

// Función principal asincrónica
async function main() {
  const params = parseaParams(process.argv.slice(2))

  // Procesar los comandos según la lógica de tu aplicación
  switch (params.action) {
    case "add":
      // Lógica para agregar una película
      const newPeli = { id: params.params.id, title: params.params.title, tags: params.params.tags }
      const addResult = await controller.add(newPeli)
      console.log(addResult)
      break
    case "get":
      // Lógica para buscar una película por ID
      const searchOptions = { id: params.params.id }
      try {
        const getResult = await controller.get(searchOptions)
        console.log(getResult)
      } catch (error) {
        console.error("Error al obtener la película:", error.message)
      }
      break
    case "search":
      // Lógica para buscar películas por título o tag
      const searchOptionsForSearch = {
        search: { title: params.params.title, tag: params.params.tags[0] }, // Asumo que solo se permite un tag en este ejemplo
      }
      try {
        const searchResult = await controller.get(searchOptionsForSearch)
        console.log(searchResult)
      } catch (error) {
        console.error("Error al buscar la película:", error.message)
      }
      break
    case undefined:
      // Manejar el caso en el que no se proporciona ningún comando
      console.log("Comando no proporcionado. Devolviendo todas las películas:")
      const allPelis = await controller.get()
      console.log(allPelis)
      break
    default:
      console.log("Comando no reconocido")
      break
  }
}

main()