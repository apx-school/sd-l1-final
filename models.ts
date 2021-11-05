import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants";
import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

getAll(){
  return jsonfile.readFile("./pelis.json").then((pelis) => {
    return pelis;});
}

getById(id: number){
  return this.getAll().then((pelis) => {
    const resultado = pelis.find((p) => {
      return p.id == id;});
    return resultado;});
}

search(options: any) {
  return this.getAll().then((pelis) => {
    if(options.title && options.tag){
      return pelis.filter((p) => {
        return p.title.includes(options.title) && p.tags.includes(options.tag);
    })
  } else if (options.title) {
      return pelis.filter((p) => {
        return p.title.includes(options.title);
    })
  } else if (options.tag) {
      return pelis.filter((p) => {
        return p.tags.includes(options.tag);
    })
  }
})  
}

add(peli: Peli): Promise<boolean> {
  const promesaUno = this.getById(peli.id).then((peliExistente) => {
    if (peliExistente) {
      return false;
    } else {
      const promesaDos = this.getAll().then((pelis) =>{
       pelis.push(peli);
       return jsonfile.writeFile("./pelis.json", pelis);
    });
 
  return promesaDos.then(() => {
    return true;
  }); } });
  return promesaUno;
  }

}

export { PelisCollection, Peli };
