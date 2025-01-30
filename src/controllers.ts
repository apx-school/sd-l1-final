import { PelisCollection, Peli } from "./models";
import { SearchOptions } from "./models";

export type Options = {
    id?: number;
    search?: {
        title?: string;
        tag?: string;
    };
};

class PelisController {
    model: PelisCollection;
    constructor() {
        this.model = new PelisCollection();
    }

    async get(options?: Options): Promise<any> {
        let res;

        if (!options) {
            res = await this.model.getAll();
        } else if (options.id && !options.search) {
            res = [];
            const aux = await this.model.getById(options.id);
            res.push(aux);
            return res;
        } else if (!options.id && options.search.tag && !options.search.title) {
            res = await this.model.search({ tag: options.search.tag });
        } else if (!options.id && options.search.title && !options.search.tag) {
            res = await this.model.search({ title: options.search.title });
        } else if (!options.id && options.search.tag && options.search.title) {
            res = await this.model.search({ title: options.search.title, tag: options.search.tag });
        }

        return res;
    }

    async getOne(options: Options): Promise<Peli> {
        try {
            const res = await this.get(options);
            return res[0];
        } catch (error) {
            console.log("error al obtener la peli");
        }
    }

    async add(peli: Peli) {
        await this.model.add(peli);
    }
}

export { PelisController };
