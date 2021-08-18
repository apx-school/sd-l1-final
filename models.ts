/** @format */

import * as jsonfile from 'jsonfile';
import { title } from 'node:process';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
	id: number;
	title: string;
	tags: string[];
}

class PelisCollection {
	pelis: Peli[];

	getAll(): Promise<any[]> {
		return jsonfile.readFile('./pelis.json').then((pelis) => {
			return (this.pelis = pelis);
		});
	}
	getById(id: number) {
		return this.getAll().then((pelis) => {
			return this.pelis.find((pelis) => {
				return pelis.id == id;
			});
		});
	}
	search(options: any): Promise<any> {
		return this.getAll().then((pelis) => {
			let answer = pelis;

			if (options.title) {
				answer = answer.filter((pelis) => {
					return pelis.title.includes(options.title);
				});
			}
			if (options.tag) {
				answer = answer.filter((pelis) => {
					return pelis.tags.includes(options.tag);
				});
			}
			return answer;
		});
	}

	add(peli: Peli): Promise<boolean> {
		return this.getById(peli.id).then((existente) => {
			if (existente) {
				return false;
			} else {
				return this.getAll().then((pelis) => {
					pelis.push(peli);
					return jsonfile.writeFile('./pelis.json', pelis);
				});
				return true;
			}
		});
	}
}
export { PelisCollection, Peli };
