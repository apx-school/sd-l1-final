import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  
  get(options:any){
    
  if (options == undefined) {
    return  this.data.getAll().then((res)=>{console.log(res)})

    } else if (options.id) {
      return  this.data.getById(options.id).then((res)=>res)

    }else if (options.search.title && options.search.tags) {
      return  this.data.search({tags:options.search.tags}).then((res)=>{
        var response = res.filter((peli)=>{ 
          return peli.includes(options.search.title)
        })
         return response
      })
      
    }else if (options.search.title) {
      
      return  this.data.search({title: options.search.title}).then((res)=> res )

    }else if (options.search.tags) {
      return  this.data.search({tags: options.search.tags}).then((res)=>res)}
  return ;
  }

  add(peli:Peli){
    this.data.add(peli);
  }

}
export { PelisController };
