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
  getById(id: number): Promise<Peli[]> {
    /*  const promiseGetById = this.data.find((i) => {
      return i.id == id;
    });
    return promiseGetById; */

    const promiseGetById = this.data.find((i) => {
      return i.id == id;
    });

    promiseGetById.then((byId) => {
      console.log(byId);
    });
    return promiseGetById;
  }
  search(options: any) {
    /*     const findByTitleOrTag = this.data.filter((i) => {
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
    return findByTitleOrTag; */

    const promiseSearch = this.data.filter((i) => {
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

    promiseSearch.then((searched) => {
      console.log(searched);
    });
    return promiseSearch;
  }
  add(peli: Peli): Promise<boolean> {
    /* const peliRepetida = this.getById(peli.id);
    if (peliRepetida) {
      return console.log(false);
    } else if (!peliRepetida) {
      this.data.push(peli);
      jsonfile.writeFile("./pelis.json", this.data);
      return console.log(true);
    }
    return peliRepetida; */

    const promesaAdd = this.getById(peli.id).then((peliRepetida) => {
      if (peliRepetida) {
        return console.log(false);
      } else if (!peliRepetida) {
        this.data.push(peli);
        const promesaWrite = jsonfile.writeFile("./pelis.json", this.data);
        return promesaWrite.then(() => {
          return console.log(true);
        });
      }
    });
    return promesaAdd;
  }
}

export { PelisCollection, Peli };
