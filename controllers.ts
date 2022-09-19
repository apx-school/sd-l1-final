import { PelisCollection, Peli } from "./models";

class PelisController {
    peliculas: PelisCollection
    constructor() {
        this.peliculas = new PelisCollection();
    }

    async get(options: any): Promise<any> {
        if (options.id) {
            const resultado = await this.peliculas.getById(options.id)
            return resultado
        } if (options.search) {
            const resultado = await this.peliculas.search(options.search)
            return resultado
        } if (options.vacio) {
            const resultado = await this.peliculas.getAll()
            return resultado
        }
    }

    add(ejemplo: Peli): Promise<boolean> {
        return this.peliculas.add(ejemplo)
    }
}
export { PelisController };