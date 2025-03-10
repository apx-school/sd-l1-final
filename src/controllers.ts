import { PelisCollection, Peli } from "./models";

type Options = {
	id?: number;
	search?: {
		title?: string;
		tag?: string;
	};
};

class PelisController {
	private model: PelisCollection;
	constructor() {
		this.model = new PelisCollection();
	}

	async get(options?: Options): Promise<Peli[]> {
		if (!options) {
			return await this.model.getAll(); // si no recibe parámetros, devuelve todas las películas
		}
		if (options.id) {
			const peli = await this.model.getById(options.id);
			return peli ? [peli] : []; // devuelve la peli en un array o vacío si no la encuentra
		}

		if (options.search) {
			return await this.model.search(options.search); // filtra por título, tag o ambos
		}

		return await this.model.getAll(); // si recibe un objeto vacío, también devuelve todas
	}
	async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
		const lista = await this.model.getAll(); // Obtiene todas las películas
		const listaFiltrada = lista.filter((p) => {
			let coincide = true; 
			if (options.title) {
        coincide =
					coincide &&
					p.title
						.toLocaleLowerCase()
						// verifica si el título incluye la palabra y compara el titulo de manera insensible a las mayusculas
						.includes(options.title.toLocaleLowerCase()); 
			}
			if (options.tag) {
        coincide =
					coincide &&
					p.tags.some(
						(tag) =>
							// verifica si el tag está en la lista de tags y compara el tag de manera insensible a las mayusculas
							tag.toLocaleLowerCase() === options.tag.toLocaleLowerCase()
					); 
			}
			return coincide; // devuelve true si coincide con ambos criterios
		});
		return listaFiltrada; // devuelve la lista filtrada
	}

	async getOne(options: Options): Promise<Peli | null> {
		try {
			const peliculas = await this.get(options); // usamos el método get para obtener las películas filtradas

			return peliculas.length > 0 ? peliculas[0] : null; // devuelve el primer resultado o null si no se encontró nada
		} catch (error) {
			console.error("Error al obtener la película:", error);
			return null; // mensaje de error, retorna null
		}
	}

	async add(peli: Peli): Promise<boolean> {
		try {
			// verifica si la película ya existe por ID
			const peliExistente = await this.model.getById(peli.id);
			if (peliExistente) {
				// console.log("El ID ", peli.id, " ya existe.");
				return false; // Si la película ya existe, no la agrega
			}

			// si la película no existe, la agrega
			// console.log("Se agregó correctamente la película.");
			await this.model.add(peli);
			return true;
		} catch (error) {
			console.error("Error al agregar la película:", error);
			return false; // si hay un error, retorna false
		}
	}
}
export { PelisController };
