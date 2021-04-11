import * as jsonfile from "jsonfile";
import * as filtrar from "lodash/filter"
import * as find from "lodash/find"
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  title: string;
  id: number;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = []
  getAll() {
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.pelis = json;
      return this.pelis;
    })
  }

  getById(id: number) {
    return this.getAll().then((item) => {
      return (item.find((p) => p.id == id));
    });
  }
  search(options: any) {
    return this.getAll().then((res) => {
      let aux = res
      if(options.title){
        aux = filtrar(aux, function(item) { return item.title.includes(options.title)})
      }
      if(options.tag){
        aux = filtrar(aux, function(item) { return item.tags.includes(options.tag)})
      }
      return aux;
    });
  }

  add(peli: Peli): Promise<any> {
    return this.getAll().then((json) => {
      let repeatedId = find(json,function(item) {return item.id === peli.id});
      if(!repeatedId){
        json.push(peli)
        return jsonfile.writeFile("./pelis.json", json).then(() => true);
      } else {
        console.log("Error, pelicula ya agregada");
        return false;
      }
    })
}
}



export { PelisCollection, Peli };
