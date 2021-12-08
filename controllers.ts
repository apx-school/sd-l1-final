import { PelisCollection, Peli } from "./models";

class PelisController {
  
  pelisCollection: PelisCollection;

  constructor(){
    this.pelisCollection = new PelisCollection;

  }
  

  get(options:any){
    let valor:any = Object.values(options)[0];


    if (Object.keys(options)[0] == undefined) {
      //console.log("estoy en id",valor)
      return this.pelisCollection.getAll();
    } if (Object.keys(options)[0] == "id") {
      // console.log("estoy en id",valor)
      return this.pelisCollection.getById(valor);
    } if (Object.keys( valor)[0] == "title" || Object.keys( valor)[0] == "tags" ) {
      // console.log("estoy en search",options.search)
      return this.pelisCollection.search(options.search);
    } else {
      return this.pelisCollection.getAll();
      }
    }
    
  add(peli:Peli){
    return this.pelisCollection.add(peli);
  }

}

export { PelisController};



// function main () {
//   console.log("MAIN de CONTROLLERS PAPA............... ")

//     const hola = new PelisController
//     const obj1 = {search: {'title': "n"}};
//     const obj2 = {search: {title: "ter"}};
//     const obj3 = { };
//     const obj4 = {search: {tags: "tt"}};
//     const obj5 = [obj1,obj3,obj4]
//     const obj6 = {search: { title: 'ti', tag: 'uu' }}
//     const obj66 = {search: { tag: 'uu', title: 'ti' }}
//     const obj7 = {get: {id:4321865}}
//     const obj8 = { id: 123, title: "carli jonessssssssssssssssssssssssss", tags: []}

//     hola.get(obj3).then(console.log).then(texto => {console.log("esofuegetall")})

//     hola.get(obj7.get).then(console.log).then(texto => {console.log("getbyid")})

//     hola.get(obj2).then(console.log).then(texto => {console.log("esofuesearchtitle")})

//     hola.get(obj4).then(console.log).then(texto => {console.log("esofuesearchtag")})

//     hola.get(obj6).then(console.log).then(texto => {console.log("esofuesearchtitleytag")})

//     hola.get(obj6).then(console.log).then(texto => {console.log("esofuesearchtagytitle")})

//     hola.add(obj8).then(console.log).then(texto => {console.log("esofueadd")})


// }

// main()