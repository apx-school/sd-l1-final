import { PelisCollection, Peli } from "./models";

class PelisController {

  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();}

get(options: any): Promise<any> {

 if(options.id){
    return this.pelisCollection.getById(options.id);
 } else if (options.search){
    if(options.search.title && options.search.tag){
       return this.pelisCollection.search({
          title: options.search.title,
          tag: options.search.tag
       })
   } else if(options.search.title){
       return this.pelisCollection.search({
          title: options.search.title
       })
   } else if(options.search.tag){
       return this.pelisCollection.search({
          tag: options.search.tag
       })
   }
 } else {
    return this.pelisCollection.getAll();
 }
}
add(peli: Peli){
    return this.pelisCollection.add(peli);
}
  }
export { PelisController };
