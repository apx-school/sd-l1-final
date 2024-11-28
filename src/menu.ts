export const helpMenu = `
Opciones de parámetros
--------------------------------------------------------------------------
add:....... Agrega una nueva Película. debe usar todos los parámetros:
            add --id={unId} --title="{titulo de la pelicula}" --tags={tag}
            => title debe ir entre comillas
            => para cada tag agregue un nuevo parámetro --tags, ejemplo:
               --tags=accion --tags=drama
               si no agrega todos los parametros mostrará un error !
........................................................................
get:....... obtiene una pelicula.
            <get {id}> id de tipo numero,
........................................................................
search:.... [--title="char"]
            title => cualquier caracter
            [--tag="tag"],
            tags => acción, drama, etc
........................................................................
help:...... [help] Muestra este Menú.
--------------------------------------------------------------------------
`;