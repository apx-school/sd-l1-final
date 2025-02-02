import { PelisCollection, Peli } from "./models";

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

        try {
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
        } catch (err) {
            res = [];
        }
        return res;
    }

    async getOne(options: Options): Promise<Peli> {
        const res = await this.get(options);

        if (res.length === 0) {
            return null;
        }

        return res[0];
    }

    async add(peli: Peli) {
        await this.model.add(peli);
    }
}

export { PelisController };
