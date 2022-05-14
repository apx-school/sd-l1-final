import * as jsonfile from "jsonfile";

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
    const promiseGetById = await this.getAll();
    const peliWithId = promiseGetById.find((i) => {
      return i.id == id;
    });
    return peliWithId;
  }
  async search(options: any): Promise<Peli[]> {
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
    const promiseAdd = await this.getById(peli.id).then((peliRepetida) => {
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
    return promiseAdd;
  }
}

export { PelisCollection, Peli };
