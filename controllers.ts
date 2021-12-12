import { PelisCollection, Peli } from "./models";

class PelisController {
  
  pelisCollection: PelisCollection;

  constructor(){
    this.pelisCollection = new PelisCollection;

  }
  
  get(options:any){

    if (options.id) {

      return this.pelisCollection.getById(options.id);
    } else if (options.search) {
      return this.pelisCollection.search(options.search);
    }  else {
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
//     const obj1 = {search: {title: "n"}};
//     const obj2 = {search: {title: "ter"}};
//     const obj3 = { };
//     const obj4 = {search: {tag: "tag 160342"}};
//     const obj5 = [obj1,obj3,obj4]
//     const obj6 = {search: { title: 'peli', tag: 'tag 150774' }}
//     const obj66 = {search: { tag: 'tag 150774', title: 'peli' }}
//     const obj7 = {get: {id:4321865}}
//     const obj8 = { id: 123, title: "carli jonessssssssssssssssssssssssss", tags: []}

//     hola.get(obj3).then(console.log).then(texto => {console.log("esofuegetall")})

//     // hola.get(obj7.get).then(console.log).then(texto => {console.log("getbyid")})

//     // hola.get(obj2).then(console.log).then(texto => {console.log("esofuesearchtitle")})

//     // hola.get(obj4).then(console.log).then(texto => {console.log("esofuesearchtag",obj4)})

//     hola.get(obj6).then(console.log).then(texto => {console.log("esofuesearchtitleytag",obj6)})

//     hola.get(obj66).then(console.log).then(texto => {console.log("esofuesearchtagytitle",obj66)})

//     // hola.add(obj8).then(console.log).then(texto => {console.log("esofueadd")})


// }

// main()