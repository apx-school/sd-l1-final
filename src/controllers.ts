import { PelisCollection, Peli } from "./models";
import { SearchOptions } from "./models";

type Options = {
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

    async get(options?: Options): Promise<Peli[]> {
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

    async getOne(options: Options) {
        const res = await this.get(options);

        return res[0];
    }

    async add(peli: Peli) {
        await this.model.add(peli);
    }
}

async function main() {
    const tes = new PelisController();

    const opt = {
        id: 333,
    };

    // await tes.add({ title: "123", id: 333, tags: ["dram", "sad"], year: 222 });
    const pel = await tes.getOne({ id: 1 });
    console.log(pel);
}

export { PelisController };
