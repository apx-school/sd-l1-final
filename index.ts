import { PelisController } from './controllers'
import * as minimist from 'minimist'

function parseaParams(argv) {
  const resultado = minimist(argv)
  return resultado
}

async function processOption(argv) {
  const pelis = new PelisController()
  const option = argv._[0]

  if (option === 'search') {
    const obj = { search: { title: argv.title, tag: argv.tag } }
    return await pelis.get(obj)
  }
  if (option === 'get') {
    if (argv._[1]) {
      const obj = { id: argv._[1] }
      return await pelis.get(obj)
    } else {
      return await pelis.pelisCollection.getAll()
    }
  }
  if (option === 'add') {
    const obj = { id: argv.id, title: argv.title, tags: argv.tags }
    return await pelis.add(obj)
  }
  if (!option) {
    return await pelis.pelisCollection.getAll()
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2))
  const resultado = await processOption(params)
}

main()
