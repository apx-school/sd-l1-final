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

/*const test = new PelisCollection();
const options = new Peli();
options.id = 99;
options.title = "Tobias peli";
options.tags = ["accion", "comedia"]
const promesa = new Promise((resolve, reject) => {
  resolve(test.search({tags: "romance", title: "40"}));
  reject("Error")
})

promesa.then(res => console.log(res))


var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];*/


 