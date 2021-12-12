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
        const resultado = this.getAll().then((pelis) => {
            const busqueda = _.find(pelis,{ 'id': id });
            return busqueda
        })
        return resultado
    }


    search (opcion:any){

        const resultado = this.getAll().then((pelis) => {
            const mapeador = _.forOwn(opcion,function(value,key){
                
                if (key === "title"){
                    let results = pelis.filter((peli) => {
                        let nombreEnMinuscula = _.lowerCase(peli.title);
                        return nombreEnMinuscula.includes(_.lowerCase(value));
                    });
                    pelis = results

                    return pelis

                } else if (key === "tag") {
                    let results = pelis.filter((peli) => {
                        let nombreEnMinuscula = _.lowerCase(peli.tags);
                        return nombreEnMinuscula.includes(_.lowerCase(value));
                        
                    });
                    pelis = results

                    return pelis
                } else {
                    return pelis
                }
            })
            return pelis
        }).then(res => {return res})
        return resultado
    }


    add(peli:Peli){
        const busquedaPeli = this.getById(peli.id).then(res => { 
                if (res !== undefined) {
                    return false
                } else {
                    const colleccionDePelis = this.getAll().then((listaDePelis: Peli[]) => {
                        listaDePelis.push(peli);
                        return jsonfile.writeFile("./pelis.json", listaDePelis)})
                    return colleccionDePelis.then(() =>{return true})
                    }
                }
            )
        return busquedaPeli
            
    }
}

export { PelisCollection, Peli};

// function main () {

//     const hola = new PelisCollection
//     const obj1 = {id:4321865}
//     const obj2 = {title: "una"};
//     const obj3 = {tag: "rr"};
//     const obj4 = { tag: 'rr', title: 'ti'};
//     const obj44 = {tag: 'ww'};
//     const obj6 = { title: 'ti', tag: 'rr' }
//     const obj8 = { id: 123, title: "carli jonessssssssssssssssssssssssss", tags: []}


//     hola.getAll().then(console.log).then(tex => {console.log("estoesgetall")})

//     // hola.getById(obj1.id).then(console.log).then(tex => {console.log("estoesgetbyid")})

//     // hola.search(obj2).then(console.log).then(tex => {console.log("estoessearchtitle")})

//     hola.search(obj3).then(console.log).then(tex => {console.log("estoessearchtag")})

//     // // hola.search(obj4).then(console.log).then(tex => {console.log("estoessearchtagytitle")})

//     // // hola.search(obj6).then(console.log).then(tex => {console.log("estoessearchtitleytag")})

//     // hola.add(obj8).then(console.log).then(tex => {console.log("estoesAdd")})

// }

// main()



// search (opcion:any){
//     const resultado = this.getAll().then((pelis) => {
//         const mapeador = _.forEach(opcion,function(){

//             if (opcion.title){
//                 let results = pelis.filter((peli) => {
//                     let nombreEnMinuscula = _.lowerCase(peli.title);
//                     return nombreEnMinuscula.includes(opcion.title);
//                 });
//                 pelis = results
//                 return pelis
//             } else if (opcion.tags) {
//                 let results = pelis.filter((peli) => {
//                     let nombreEnMinuscula = _.lowerCase(peli.tags);
//                     return nombreEnMinuscula.includes(_.lowerCase(opcion.tags));
//                   });
//                 pelis = results
//                 return pelis
//             } else {
//                 return pelis
//             }
//         })
//         return pelis
//     }).then(res => {return res})
//     return resultado
// }
