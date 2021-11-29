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
        return jsonfile.readFile("./pelis.json").then((busqueda) => {return busqueda})
    };

    

    getById(id:number):Promise<Peli>{
        return this.getAll().then(pelis => {
            const busqueda = _.find(pelis,{ 'id': id });
            return busqueda;
        }
        )
    }


    search (opcion:any):Promise<any>{
        return this.getAll().then(pelis => {            
            let contador = 0
            const mapeador = _.forEach(opcion,function(){
                if (Object.keys(opcion)[contador]  === "title"){
                    const search:any = Object.values(opcion)[0];
                    const results =  _.filter(pelis, function(item) {
                        return item.title.toLowerCase().toString().indexOf(search) > -1;
                    });
                    contador = contador + 1
                    pelis = results
                } else {
                    let searchTAG:any = Object.values(opcion)[contador];
                    const results =  _.filter(pelis, function(item) {
                        return item.tags.toString().toLowerCase().indexOf(searchTAG.toString().toLowerCase()) > -1;
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
        return this.getAll().then(pelis => {
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
//     const obj1 = {'title': "n"};
//     const obj2 = {title: "una"};
//     const obj3 = {tags: "nanan"};
//     const obj4 = {tags: "tt"};
//     const obj5 = [obj1,obj3,obj4]
//     const obj6 = { title: 'ti', tag: 'uu' }
//     const obj7 = {id:4321865}
//     const obj8 = { id: 123, title: "carli jonessssssssssssssssssssssssss", tags: []}


//     hola.getAll().then(console.log)

//    hola.getById(obj7.id).then(console.log)

//     hola.search(obj2).then(console.log)

//     hola.search(obj4).then(console.log)

//     hola.search(obj6).then(console.log)

//     hola.add(obj8).then(console.log)


// }

// main()

