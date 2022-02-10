import { PelisCollection, Peli } from "./models";

class PelisController {

  data: PelisCollection
  constructor() {
    this.data = new PelisCollection
  }


  get(options){
    
      if(options.id){
            return   this.data.getById(options.id).then((e)=>{
                       return e
        })
      }else if(options.search){
            
              return  this.data.search(options.search).then((e)=>{
                return e 
              })
    
      }else {
              return  this.data.getAll().then((e)=>{
                           return e
                      })
            }


        
    
  }

  add(obj){
     return  this.data.add(obj).then((e)=>{
       return e
     })
  }
}
export { PelisController };

