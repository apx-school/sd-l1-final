import { PelisCollection, Peli } from "./models";

class PelisController {
    collectionPelis: PelisCollection;
    constructor() {
        this.collectionPelis = new PelisCollection();
    }
    get(options) {
        if (options.id) {
            return this.collectionPelis.getById(options.id).then((item) => {
                return item;
            });
        } else if (options.search) {
            return this.collectionPelis.search(options.search).then((item) => {
                return item;
            });
        } else if (options.getAll) {
            return this.collectionPelis.getAll().then((item) => {
                return item;
            });
        }
    }
    add(peli: Peli) {
        return this.collectionPelis.add(peli);
    }
}
export { PelisController };
