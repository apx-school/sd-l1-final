import { PelisCollection, Peli } from "./models";


class PelisController {
  
  pelis: PelisCollection
  promesa: Promise <any>

  constructor() {
    this.pelis = new PelisCollection()
    

  }

  get (options:any): Promise<any>{

    if (options.id){
    return this.pelis.getById(options.id).then((p)=>{return p})}

     else if (options.search){ 
        return this.pelis.search(options.search).then((p) => 
        {return p})}

      else if ({}){
         return this.pelis.getAll().then((p)=>{return p})}
      
  } 
 
add (peli:Peli){
  return this.pelis.add(peli).then((p)=>{ return p})
}
}

export { PelisController };




// function main (){
//   const objeto = ({ id:4421, title:"Otra peli", tags:["classic","action"] })
//   const prueba = new PelisController ()
//  prueba.add (objeto).then((p)=>{ console.log(p)})
// }

// main ()

// function main (){
//   const objeto = ({search:{ title:"Ju" }} )
//   const prod = new PelisController()
//   prod.get(objeto).then((p)=>{console.log(p)})
// }

// main()

// function parseaParams (argv){
//   const resultadoMinimist = minimist (argv)

//    return resultadoMinimist
//   }


// function main (){

// const argumentos = process.argv.slice(2)
// const argumentosParseados = parseaParams (argumentos)
// const controller = new PelisController()
// if (argumentosParseados._[0] == "search"){console.log("imprime")
//   if (argumentosParseados.title){return controller.get(
//     {search:{title:argumentosParseados.title}}).then((p)=>{console.log(p)})}
// }

// console.log(argumentosParseados)
// }


// main ()
