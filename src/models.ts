import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  readonly FILE_PATH = './pelis.json';

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.FILE_PATH)
      .then((pelis: Peli[]) => pelis)
      .catch((error) => {
        if (error.code === 'ENOENT') return [];
        throw error;
      });
  }

  getById(id: number): Promise<Peli | null> {
    return this.getAll().then((pelis: Peli[]) => {
      const pelicula = pelis.find(peli => peli.id === Number(id));
      return pelicula ? pelicula : null;
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id)
      .then(peliExistente => {
        if (peliExistente) return false; 
  
        return jsonfile.readFile(this.FILE_PATH)
          .catch(() => []) 
          .then((pelis: Peli[]) => {
            pelis.push(peli); 
            return jsonfile.writeFile(this.FILE_PATH, pelis, { spaces: 2 })
              .then(() => true) 
              .catch(() => false); 
          });
      })
      .catch(() => false); 
  }
  

  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const pelis = await this.getAll();
    
    return pelis.filter(peli => {
      const matchesTitle = options.title 
        ? peli.title.toLowerCase().includes(options.title.toLowerCase())
        : true;
  
      const matchesTag = options.tag 
        ? peli.tags?.some(tag => tag.toLowerCase() === options.tag.toLowerCase()) 
        : true;
  
      return matchesTitle && matchesTag;
    });
  }
  
  
  
  
}

export { PelisCollection, Peli };

