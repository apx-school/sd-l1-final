import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Promise<Peli[]>;
  constructor() {
    this.data = this.readData()
  }
  readData(): Promise<Peli[]> {
    const pelis = jsonfile.readFile("../pelis.json").then((json) => {
      return this.data = json;
    });
    return pelis;
  }
  getById(id: number): Promise<Peli> {
    return this.data.then((movie) => {
      const result = movie.find((mov) => {
        return mov.id == id;
      });
      if (result) {
        return Promise.resolve(result);
      }
      return Promise.reject("No se encontro la pelicula")
    });
  }
  search(options: any) {
    console.log(options);
    const promise = this.data.then((arrayMovs) => {

      if (options.title && options.tags) {

        const normalizedTitle = options.title.toLocaleLowerCase();

        const findTitleAndTag = arrayMovs.filter((titleAndTag) => {
          return ((titleAndTag.title.toLocaleLowerCase().includes(normalizedTitle) && titleAndTag.tags.includes(options.tags)))
        })

        return findTitleAndTag;

      } else if (options.title) {
        const normalizedTitle = options.title.toLocaleLowerCase();
        const findMov = arrayMovs.filter((name) => {
          return (name.title.toLocaleLowerCase().includes(normalizedTitle))
        });

        return findMov;

      } else if (options.tags) {
        const normalizedTag = options.tags.toLocaleLowerCase();
        const findTagMov = arrayMovs.filter((tag) => {
          return (tag.tags.includes(normalizedTag))
        });

        return findTagMov;
      }
    })

    return promise;
  }
  /*add(movie:Peli):Promise<boolean> {
    const firstPromise = this.getById(movie.id).then((listedMovie)=>{
      if(listedMovie){
        return false;
      }else{
        const data = this.data.push(movie);
        const secondPromise = jsonfile.writeFile("./pelis.json",data);

        return secondPromise.then(()=>{
          return true;
        });
      }
    });
    return firstPromise;
  }*/
}

export { PelisCollection, Peli }


