import * as jsonfile from "jsonfile"
import * as _ from "lodash";

class Peli {
    id: number;
    title: string;
    tags:string[]=[]
    constructor(idCtrl:number,titleCrtl:string,tagsCrtl:[]){
        this.id = idCtrl,
        this.title = titleCrtl,
        this.tags = tagsCrtl
    }
}

class PelisCollection {

    
    getAll(){
        return jsonfile.readFile("./pelis.json").then(res => {return res})
    };

    

    getById(id:number){
        return this.getAll().then((pelis) => {
            const busqueda = _.find(pelis,{ 'id': id });
            return busqueda;
        }
        )
    }


    search (opcion:any){
        return this.getAll().then((pelis) => {            
            let contador = 0
            const mapeador = _.forEach(opcion,function(){
                if (Object.keys(opcion)[contador]  === "title"){
                    let search:any = Object.values(opcion)[contador];
                    let results =  _.filter(pelis, function(item) {
                        return item.title.indexOf(search) > -1;
                    });
                    contador = contador + 1
                    pelis = results
                } else {
                    let searchTAG:any = Object.values(opcion)[contador];
                    let results =  _.filter(pelis, function(item) {
                        return item.tags.indexOf(searchTAG) > -1;
                    });
                    contador = contador + 1
                    pelis = results
                }
            })
            return pelis
        }
        )
        
    }


    add(peli:Peli):Promise<boolean>{
        return this.getAll().then((pelis) => {
            return this.getById(peli.id).then(buscado => {
                if (buscado == undefined) {
                    pelis.push(peli)
                    jsonfile.writeFile("./pelis.json",pelis);
                    return true
                } else {
                    return false
                }
            })
        })
    }
}

export { PelisCollection, Peli};

// function main () {

//     const hola = new PelisCollection
//     const obj2 = {title: "una"};
//     const obj3 = {tags: "nanan"};
//     const obj4 = { tags: 'rr', title: 'ti'};
//     const obj44 = {tags: 'ww'};
//     const obj6 = { title: 'ti', tags: 'rr' }
//     const obj7 = {id:4321865}
//     const obj8 = { id: 123, title: "carli jonessssssssssssssssssssssssss", tags: []}


//     // hola.getAll().then(console.log)

//     // hola.getById(obj7.id).then(console.log)

//     // hola.search(obj2).then(console.log)

//     // hola.search(obj4).then(console.log)

//     // hola.search(obj6).then(console.log)

//     // hola.add(obj8).then(console.log)


// }

// main()

