import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
    return pelis;
    });
  }
  getById(id:number){
    return this.getAll().then((pelis)=>{
      const peliPorId = pelis.find((p)=>{
        return p.id == id;
      });
      return peliPorId;
    })
  }
  async search(options: any) {
		const pelis = await this.getAll();
		if (options.title && options.tag) {
			return pelis.filter((peli) => {
				const peliPorTitulo = peli['title'].includes(options.title);
				const resultado = peli.tags.map((tag) => tag.toLowerCase());
				const peliPorTag = resultado.includes(options.tag);
				return peliPorTitulo && peliPorTag;
			});
		} else if (options.title) {
			return pelis.filter((peli) => peli['title'].includes(options.title));
		} else if (options.tag) {
			return pelis.filter((peli) => {
				const resultado = peli.tags.map((tag) => tag.toLowerCase());
				return resultado.includes(options.tag);
			});
		} else {
			return pelis;
		}
	}
  async add(peli: Peli): Promise<Boolean> {
		const estaElId= await this.getById(peli.id);
		if (estaElId) {
			//console.log("existente")
		}
		const pelis = await this.getAll();
		pelis.push(peli);
		await jsonfile.writeFile('./pelis.json', pelis);
		//console.log( peli,);
		return true;
	}
}
export { PelisCollection, Peli };