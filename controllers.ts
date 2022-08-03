import { PelisCollection, Peli } from './models';

class PelisController {
    controlPelis: PelisCollection;
    constructor() {
        this.controlPelis = new PelisCollection();
    }
    get(options) {
        /*  console.log(options);
        console.log(options.search); */
        if (options.id) {
            const pelisPorId = this.controlPelis.getById(options.id);
            pelisPorId.then((peli) => {
                return peli;
            });
            return pelisPorId;
        }
        /*console.log(options.hasOwnProperty('search'));*/
        if (options.hasOwnProperty('search')) {
            //console.log(options.search);
            if (
                options.search.hasOwnProperty('title') &&
                !options.search.hasOwnProperty('tag')
            ) {
                //console.log('entre c title S tag');
                const pelisPorTitle = this.controlPelis
                    .search(options.search)
                    .then((rta) => {
                        //console.log('rta', rta);
                        return rta;
                    });
                return pelisPorTitle;
            }
            if (
                options.search.hasOwnProperty('tag') &&
                !options.search.hasOwnProperty('title')
            ) {
                //console.log('con tag y sin title');
                const pelisPorTag = this.controlPelis
                    .search(options.search)
                    .then((rta) => {
                        return rta;
                    });
                return pelisPorTag;
            }
            if (
                options.search.hasOwnProperty('tag') &&
                options.search.hasOwnProperty('title')
            ) {
                //console.log('entre c title c tag');
                const pelisPorTagYTitle = this.controlPelis
                    .search(options.search)
                    .then((rta) => {
                        return rta;
                    });
                return pelisPorTagYTitle;
            }
        } else {
            const todasLasPelis = this.controlPelis.getAll();
            todasLasPelis.then(() => {
                return todasLasPelis;
            });
            return todasLasPelis;
        }
    }
    add(peli: Peli) {
        //console.log('entro en controller.ts .add');
        const addPeli = this.controlPelis.add(peli).then((pelis) => {
            //console.log(pelis);
            return pelis;
        });
        return addPeli;
    }
}
export { PelisController };
