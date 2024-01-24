import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection
  }
  add(peli: Peli){
    return this.pelis.add(peli);
  }
  get(options: Options){
    if(options.id){
      return this.pelis.getById(options.id)
    }
    if(options == undefined){
      return this.pelis.getAll
    }
    if(options.search){
      if(options.search.tag && options.search.title){
        return this.pelis.search({tag: options.search.tag}).then((res)=>{               //return del condicional
          return res.filter((peli)=>{                                                   //return de la promesa
            return peli.title.toLowerCase().includes(options.search.title)})            //return del .filter()
          })
      } else{
        return this.pelis.search(options.search)
      }
    }
    return this.pelis.getAll();
  }
}
export { PelisController };


//control.add({id: 30,title: "probando",rating:3.0,tags:["acción"],year:2023}).then((respuesta)=>console.log(respuesta))
