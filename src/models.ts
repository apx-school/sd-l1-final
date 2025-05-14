import * as jsonfile from "jsonfile";
import * as path from "path"; // Importa el módulo path
import * as fs from "fs"; // Importa el módulo fs

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  private filePath: string; // Propiedad para almacenar la ruta del archivo

  constructor() {
    // Establece la ruta absoluta del archivo pelis.json
    this.filePath = path.join(__dirname, 'pelis.json'); // Asegúrate de que pelis.json esté en la misma carpeta que este archivo
    this.initializeFile(); // Inicializa el archivo al crear la instancia
  }

  // Método para inicializar el archivo pelis.json si no existe
  private async initializeFile() {
    if (!fs.existsSync(this.filePath)) {
      const initialData: Peli[] = []; // Puedes agregar datos iniciales si lo deseas
      await jsonfile.writeFile(this.filePath, initialData);
    }
  }

  // Método para obtener todas las películas
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.filePath); // Usa la ruta absoluta
  }

  // Método para obtener una película por ID
  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    return pelis.find(peli => peli.id === id) || null;
  }

  // Método para buscar películas por título o tag
  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter(peli => {
      const matchesTitle = options.title ? peli.title.toLowerCase().includes(options.title.toLowerCase()) : true;
      const matchesTag = options.tag ? peli.tags.includes(options.tag) : true;
      return matchesTitle && matchesTag;
    });
  }

  // Método para agregar una nueva película
  async add(peli: Peli): Promise<boolean> {
    const pelis = await this.getAll();

    if (pelis.some(existingPeli => existingPeli.id === peli.id)) {
      return false; // No se puede agregar, ID duplicado
    }

    pelis.push(peli);
    await jsonfile.writeFile(this.filePath, pelis); // Usa la ruta absoluta
    return true;
  }
}

export { PelisCollection, Peli };
