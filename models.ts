import * as jsonfile from "jsonfile";
import {isEmpty,isNumber} from "lodash"


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
	id: number;
	title: string;
	tags: string[];
}

class PelisCollection {
	//devuelve todas las peliculas en una promesa
	async getAll(): Promise<Peli[]> {
		const todasLasPelis = jsonfile.readFile("./pelis.json");
    return todasLasPelis
	}

	//devuelve 1 peli en promesa
	async getById(id: number): Promise<Peli> {
		const soloUna = (await this.getAll()).find((peli) => peli.id == id);
    return soloUna
  }


	//busca una peli dependiendo de los parametros recibidos
  //IDEA ===> hacer 2 funciones(tag y title) y hacer un diccionario y segun los parametros activar el necesario 
	async search(options: any):Promise<any>{
    let pelis = await this.getAll()
    const tag =  options.tag
    const title = options.title



    if(tag || title){

      if (tag && title) {
        let rtaTagTitle = pelis.filter(peli=>{
          let copiaTags = peli.tags.map(tag=>tag.toLowerCase())
          let comparacionTag = copiaTags.includes(options.tag.toLowerCase())
          let comparacionTitle = (peli.title.toString()).toLowerCase().includes((options.title.toString()).toLowerCase())
          if (comparacionTag && comparacionTitle) {
            return peli
          }
        })
        return rtaTagTitle
      }

      else if(tag && !title){
        let rtaTag = pelis.filter(peli =>{
        let copiaTagsMinuscula = peli.tags.map(tag=>tag.toLowerCase())
        let comparacion = copiaTagsMinuscula.includes(options.tag.toLowerCase()) 
        return comparacion
      })
        //console.log("soySoloTAG");
        return rtaTag 
      }

      else if(title && !tag){
        let rtaTitle = pelis.filter(peli =>{
          const tituloPeli = (peli.title.toString()).toLowerCase()
          const tituloBuscado = (options.title.toString()).toLowerCase()
          return tituloPeli.includes(tituloBuscado)
        }) 
        return rtaTitle
      }
    
    }

  }

	// agrega una peli al json
	async add(peli: Peli): Promise<boolean> {
    const hayPeli = await this.getById(peli.id)    
    
		if (hayPeli) {
      return false
		}
    if(!hayPeli){
			const data = await this.getAll();
			data.push(peli);
			const promesaDos = await jsonfile.writeFile("./pelis.json", data);
			return true;
		}
    
    
	}

}
export { PelisCollection, Peli };

// ////
// const p = new PelisCollection()
// const options = {
//   search:{tag:"comedia",title:"pO",}
// }
// async function main(){
//   const b = await p.search(options)
  
  
// }

// main()

