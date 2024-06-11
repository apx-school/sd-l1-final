import minimist from "minimist";

const args = minimist(process.argv.slice(2));

if (args._[0] === 'add') {
    const nuevaPelicula = {
        id: args.id,
        title: args.title,
        tags: args.tags.split(',')
    };
    // Lógica para agregar la nueva película
} else if (args._[0] === 'search') {
    const objetoBusqueda = {
        id: args.id,
        title: args.title,
        tag: args.tag,
        search: true
    };
    // Lógica para buscar películas según los criterios proporcionados
} else {
    console.log('Comando no reconocido. Los comandos válidos son: add, search');
}
