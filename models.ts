import * as jsonfile from "jsonfile";

class Peli {
	id: number;
	title: string;
	tags: string[];
}

class PelisCollection {
	pelis: Peli[] = [];
	getAll(): Promise<Peli[]> {
		return jsonfile.readFile("./pelis.json").then((p) => {
			return p;
		});
	}
	getById(id: number) {
		return this.getAll().then((p) => {
			return p.find((i) => {
				return i.id == id;
			});
		});
	}
	search(option: any) {
		return this.getAll().then((p) => {
			if (option.title && option.tag) {
				return p.filter((i) => {
					return i.title.includes(option.title) && i.tags.includes(option.tag);
				});
			} else if (option.title) {
				return p.filter((i) => {
					return i.title.includes(option.title);
				});
			} else if (option.tag) {
				return p.filter((i) => {
					return i.tags.includes(option.tag);
				});
			}
		});
	}
	add(peli: Peli): Promise<boolean> {
		const promesaUno = this.getById(peli.id).then((peliExistente) => {
			if (peliExistente) {
				return false;
			} else {
				const data = this.pelis;
				data.push(peli);
				const promesaDos = jsonfile.writeFile("./pelis.json", data);
				return promesaDos.then(() => {
					return true;
				});
			}
		});
		return promesaUno;
	}
}

export { PelisCollection, Peli };
