import { PelisCollection, Peli} from "./models";
const coleccionPelis = new PelisCollection;
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

type SearchOptions = { title?: string; tag?: string }; 

class PelisController {
  constructor() { }
  
  async get(options?: Options):Promise <Peli | undefined | any  /*undefined |Peli[]*/ > /* VER ALGUNOOTRO DEVUELVE ARRAY pELI*/ {
    //const searchOptions = { title: options.search.title, tag : options.search.tag}
    if (options?.id) {
     return await coleccionPelis.getById(options.id) //ESTE PARECE HABER FUNCIONADO
    }
    // if (options?.search) {
    //   let searchOptions = {
    //     title: options.search.title,
    //     tag: options.search.tag
    //   }
    //   return await coleccionPelis.search(searchOptions)
    // }

    // //-----LO DE ABAJO ANDAARÍA, ESTOY VIENDO SI PUEDO ESCRIBIR MENOS:

    if (options.search) {
      let dobleCheck = options.search
      options.search.title && options.search.tag
      return await coleccionPelis.search(dobleCheck)          ///Ver esto parece andar
    }
    else if (options.search) {
      return await coleccionPelis.search(options.search)     
    }
  //------------------------------------------------------------------------------------------//
    // if (options.search) {
    //   let dobleCheck = true 
    //   if (options.search.title) {
    //   return await dobleCheck && coleccionPelis.search(options.search)
    //   };
  
    //   if (options.search.tag) {
    //   return  await dobleCheck && coleccionPelis.search(options.search)
    //   };
    //   return dobleCheck
    // }
  //------------------------------------------------------------------------------------------//
         
       
    //   let searchOptions = { tag: options.search.tag }
    //   return await coleccionPelis.search(searchOptions)
    // };
    // if (options.search.title && options.search.tag ) {

    // }
    else { return await coleccionPelis.getAll() }
    
  };
  async add(peli: Peli) {
   return await coleccionPelis.add(peli)   //VER SI ESTO FUNCIONA
  }
  
}


export { PelisController };
