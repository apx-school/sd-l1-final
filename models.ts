import { timeStamp } from "console";
import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras


class Peli {
  id: number;
  title: string;
  tags: string[];
}



class PelisCollection {


  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }



async getById (id: number){
  const movies = await this.getAll();
  return movies.find((i)=>{
    return i.id == id;
  });
}

async search (option: any) {
  const movies = await this.getAll();
  if (option.title && option.tag) {
    return movies.filter((i) => i.title.includes(option.title) && i.tags.includes(option.tag));
  } else if (option.title) {
    return movies.filter((i) => i.title.includes(option.title));
  }else if(option.tag) {
    return movies.filter((i)=> i.tags.includes(option.tag))
  }

 
} 


async add (movie: Peli): Promise<boolean> {
    const movieiN = await this.getById(movie.id);
    if (movieiN) {
      return false;
    } else {
      const data = await this.getAll();
      data.push(movie);
      await jsonfile.writeFile("./pelis.json", data);
      return true;
    }
  }

}








export { PelisCollection, Peli };
