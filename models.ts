import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
	title: string;
	id: number;
	rating: number;
	tags: string[];
	añoDeLanzamiento: number;
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
	// pelis: Peli[] = [];
	async getAll(): Promise<Peli[]> {
		return jsonfile.readFile('./pelis.json').then((res) => res);
	}
	async getById(id: number): Promise<Peli> {
		return this.getAll().then((pelis) => pelis.find((peli) => peli.id == id));
	}
	async search(options: SearchOptions): Promise<Peli[]> {
		// fijarse de que se puedan combinar los dos parametros, pq ahora si se usan los dos parametros tiene en cuenta el primero unicamente
		if (options.title) return this.getAll().then((pelis) => pelis.filter((peli) => peli.title.includes(options.title)));
		if (options.tag) return this.getAll().then((pelis) => pelis.filter((peli) => peli.tags.includes(options.tag)));
	}
	/* async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = {...};
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
  
        return promesaDos.then(() => {
          return true;
        });
      }
    });
  
    return promesaUno;
	} */
}

const peli = new PelisCollection();
const opciones = {
	title: 'p',
};
peli.search(opciones).then((res) => console.log(res)); // fijarse de poner todo a minusculas

export { PelisCollection, Peli };
