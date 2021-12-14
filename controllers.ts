import { PelisCollection, Peli } from "./models";

class PelisController {
 data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }

  get(options:any){
    
    if (options.id) {
      return  this.data.getById(options.id).then((res)=>console.log(res))

    }else if (options.search.title && options.search.tag) {

      return  this.data.search({tags:options.search.tag}).then((res)=>{
        var respons = res.filter((peli)=>{ 
          return peli.includes(options.search.title)
        })
         return respons
      })
    }else if (options.search.title) {
      
      return  this.data.search({title: options.search.title}).then((res)=> res )

    }else if (options.search.tags) {
      return  this.data.search({tag: options.search.tags}).then((res)=>res)

    }else if (options == undefined) {
      return  this.data.getAll().then((res)=>{console.log(res)})
    }
  return ;
  }

  add(peli:Peli){
    this.data.add(peli);
  }

}
export { PelisController };
