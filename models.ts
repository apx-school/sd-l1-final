import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    const promiseGetAll = jsonfile.readFile("./pelis.json");
    promiseGetAll.then((json) => {
      this.data = json;
    });
    return promiseGetAll;
  }
  async getById(id: number): Promise<Peli> {
    /* const findById = this.data.find((i) => {
      return i.id == id;
    });
    return findById; */

    const promiseGetById = await this.getAll();
    const peliWithId = promiseGetById.find((i) => {
      return i.id == id;
    });
    return peliWithId;
  }
  async search(options: any): Promise<Peli[]> {
    /* const findByTitleOrTag = this.data.filter((i) => {
      if (options.title) {
        const mapTitles = i.title;
        const findTitle = mapTitles.includes(options);
        return findTitle;
      } else if (options.tag) {
        const mapTags = i.tags;
        const findTags = mapTags.includes(options);
        return findTags;
      }
    });
    return findByTitleOrTag; */

    const promiseSearch = await this.getAll();
    const pelisWithTitleOrTag = promiseSearch.filter((i) => {
      if (options.title) {
        const mapTitles = i.title;
        const findTitle = mapTitles.includes(options.title);
        return findTitle;
      } else if (options.tag) {
        const mapTags = i.tags;
        const findTags = mapTags.includes(options.tag);
        return findTags;
      }
    });
    return pelisWithTitleOrTag;
  }
  async add(peli: Peli): Promise<boolean> {
    /* const peliRepetida = this.getById(peli.id);
    if (peliRepetida) {
      return console.log(false);
    } else if (!peliRepetida) {
      this.data.push(peli);
      jsonfile.writeFile("./pelis.json", this.data);
      return console.log(true);
    } */

    const promesaAdd = await this.getById(peli.id).then((peliRepetida) => {
      if (peliRepetida) {
        return false;
      } else if (!peliRepetida) {
        this.data.push(peli);
        const promesaWrite = jsonfile.writeFile("./pelis.json", this.data);
        return promesaWrite.then(() => {
          return true;
        });
      }
    });
    return promesaAdd;
  }
}

export { PelisCollection, Peli };
