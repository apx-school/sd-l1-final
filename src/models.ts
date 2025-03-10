import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
	id: number;
	title: string;
	tags: string[];
}

class PelisCollection {
	// getAll(): Promise<Peli[]> {
	//   return jsonfile.readFile("...laRutaDelArchivo").then(() => {
	//     // la respuesta de la promesa
	//     return [Peli];
	//   });
	// }

	async add(peli: Peli): Promise<boolean> {
		// leemos el archivo actual
		const data: Peli[] = await jsonfile.readFile("./pelis.json");

		// Verificamos si el ID ya existe
		const peliExistente = await this.getById(peli.id);
		if (peliExistente) {
			// Si el ID ya existe, devolvemos false sin agregar la película
			return false;
		}

		// Agregamos la nueva película
		data.push(peli);
		// Escribimos el archivo actualizado
		await jsonfile.writeFile("./pelis.json", data);
		return true;
	}

	async getAll(): Promise<Peli[]> {
		try {
			// leemos el archivo
			const data: Peli[] = await jsonfile.readFile("./pelis.json");
			return data; // devolvemos el archivo
		} catch (error) {
			// devolvemos el mensaje error si es que no se pudo leer el archivo
			console.error("Error al leer el archivo:", error);
			return []; // devuelve un array vacío
		}
	}

	async getById(id: number): Promise<Peli | null> {
		try {
			// leemos el archivo
			const data: Peli[] = await jsonfile.readFile("./pelis.json");
			// en esta const guardaremos la peli que se busco con find según su ID
			const peliEncontrada = data.find((p) => p.id === id) || null;
			return peliEncontrada;
		} catch (error) {
			// mensaje de error al no leer el archivo
			console.error("Error al leer el archivo:", error);
			return null;
		}
	}

	async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
		const listaPelis = await this.getAll(); // obtiene todas las películas
		// console.log("Lista completa ", listaPelis);
		const listaPelisFiltrada = listaPelis.filter((p) => {
			let peliEncontrada = false;
			if (options.tag) {
				peliEncontrada = p.tags.includes(options.tag); // verifica si el tag está en la lista de tags
			}
			if (options.title) {
				peliEncontrada = peliEncontrada || p.title.toLowerCase().includes(options.title.toLowerCase()); // verifica si el título incluye la cadena
			}
			return peliEncontrada;
		});
		return listaPelisFiltrada;
	}
}
export { PelisCollection, Peli };
