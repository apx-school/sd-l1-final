# models.ts
Tomar la estructura base y completá la clase PelisCollection. Además, agregar a esta clase los siguientes métodos asincrónicos, o sea que todos deben devolver una promesa que a su vez devuelva lo indicado en cada método.

## add(peli:Peli):Promise<boolean>
Recibe una Peli y la guarda en el archivo.

Tiene que devolver un boolean que indique si se agregó correctamente la peli.

## getAll():Peli[]
Devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas en el archivo JSON.

## getById(id:number):Promise<Peli>
Devuelve la peli con el id que se le pase por parámetro.

## search(options:SearchOptions):Promise<Peli[]>
Recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
Si el objeto tiene la propiedad title, el método tiene que devolver todas las películas que tengan ese string en su title. Por ejemplo si search es "a" debe devolver todas las películas que tengan la letra "a" en su title.
Si el objeto tiene la propiedad tag, el método tiene que devolver todas las películas que tengan ese string en sus tags. Por ejemplo si tag es "classic" debe devolver todas las películas que tengan el tag "classic".

# controler.ts
Instanciá el modelo PelisCollection y guardalo en una propiedad interna del controller.
Tomar la estructura base y completar la clase PelisController. Además, agregar a esta clase los siguientes métodos asincrónicos que tienen que usar los métodos del modelo para interactuar con la data.

## get(options?:Options)
Recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:

Si el objeto tiene la propiedad id, debe devolver la película con ese id.
Si el objeto tiene la propiedad search y:
Si el objeto search tiene la propiedad title, debe buscar las pelis que tengan ese string en el título.
Si el objeto search tiene la propiedad tag, debe buscar las pelis que tengan ese tag.
Puede recibir las dos opciones.
Si no recibe ningún parámetro, debe devolver todas las películas.

## add(peli:Peli)
Recibe un objeto y crea una peli en base a el mismo.

# index.ts
Usar la libreria minimist para parsear los argumentos. Los comandos que deberian funcionar son los siguientes:

#Agrega peli
ts-node index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic

### Busca peli por id
ts-node index.ts get 4411

### Busca peli por título
ts-node index.ts search --title="a"

### Busca peli por tag (es singular)
ts-node index.ts search --tag="classic"

### Busca peli por tag y title
ts-node index.ts search --title="x" --tag="action"

### Este último comando debe devolver todas las películas
ts-node index.ts
