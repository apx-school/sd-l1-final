import * as jsonfile from 'jsonfile';
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id;
    title;
    tags;
}
class PelisCollection {
    async getAll() {
        return await jsonfile.readFile('./pelis.json').then(pelis => {
            return pelis;
        });
    }
    async add(peli) {
        if (!peli.id && !peli.title && !peli.tags)
            return await Promise.reject('Missing movie params');
        return await this.getAll().then(async (data) => {
            const newData = [...data, peli];
            return await jsonfile
                .writeFile('./pelis.json', newData, { spaces: 2 })
                .then(() => {
                return 'Movie added';
            })
                .catch(err => {
                return 'Error processing movie: ' + err;
            });
        });
    }
    async getById(id) {
        return await this.getAll().then(pelis => {
            return pelis.find(peli => peli.id === id);
        });
    }
    async search(options) {
        return await this.getAll().then(pelis => {
            if (options.title && options.tag)
                return pelis.filter(peli => {
                    return (peli.title.includes(options.title) &&
                        peli.tags.includes(options.tag));
                });
            if (options.title)
                return pelis.filter(peli => peli.title.includes(options.title));
            if (options.tag)
                return pelis.filter(peli => peli.tags.includes(options.tag));
            return pelis;
        });
    }
}
export { PelisCollection, Peli };
