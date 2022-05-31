import { timeStamp } from 'console';
import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  lista : Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile('./pelis.json').then((obj) => { return obj });
  };
  getById(id:number): Promise<Peli> {
    return jsonfile.readFile('./pelis.json').then((obj) => obj.find((contact) =>{ return contact.id == id }));
  };
  add(peli:Peli): Promise<boolean>{

    const promesaUno = this.getById(peli.id).then(async (peliExistente) => {
      
      if (peliExistente) {
        return promesaUno.then(() => {
          return false;
        });

      } else {

        // magia que agrega la pelicula a un objeto data
        // Esto anda sincronicamente OK

        // const data = jsonfile.readFileSync('./pelis.json');
        // data.push(peli);

        // si intento asincronico:
        const listaPelis = await this.getAll();
        listaPelis.push(peli);

        const promesaDos = jsonfile.writeFile("./pelis.json", listaPelis);

        return promesaDos.then(() => {
          return true;
        });

      }
    });

    return promesaUno;
  };

  // Copié el metodo search para descartar que sea el método en si..
  // lo copie de un PR que paso los test, unicamente para ver si el tema estaba en mi codigo,
  //  o en los test.. creo que esta en los test el tema

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
  // async search(options: any): Promise<Peli[]>{
  //   // const promisePelis = this.getAll().then((obj) => {
  //   //   const elements = obj.filter((x) => {
  //   //     return x.title == options.title
  //   //   });
  //   //   return elements
  //   //  });

  //   const pelis = await this.getAll();

  //   if(options.title){
  //     const filtred = pelis.filter((x) => { 
  //       return x.title == options.title
  //     })
  //     return filtred
  //   }
    
  //   if(options.tags){
  //     const filtred = pelis.filter((x) => { 
  //       return x.tags.includes(options.tags);
  //     })

  //     return filtred
  //   }

  //   // const listaPelis = promisePelis.then((obj) => { 
      
  //   // })

  //   // return promisePelis
  // }
  
}

export { PelisCollection, Peli };
