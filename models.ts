import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[]=[];
  getAll(): Promise<Peli[]> {
    const promise = jsonfile.readFile("./pelis.json").then((json) => {
      return this.data = json;
    });
    return promise
  }
  getById(id:number):Promise<Peli>{
    return this.getAll().then((movie)=>{
      const result = movie.find((mov)=>{
        return mov.id == id;
      });
      return result;
    });
  }
  search(options:any){
    console.log(options)
    const promise = this.getAll().then((arrayMovs)=>{
      
      if(options.title && options.tags){
       
        const normalizedTitle = options.title.toLocaleLowerCase();
        const normalizedTags = options.tags.toLocaleLowerCase();

        const findTitleAndTag = arrayMovs.filter((titleAndTag)=>{
          return ((titleAndTag.title.toLocaleLowerCase().includes(normalizedTitle) && titleAndTag.tags.includes(normalizedTags)))
        })

      return findTitleAndTag;

      }else if(options.title){ 
        const normalizedTitle = options.title.toLocaleLowerCase();
        const findMov =  arrayMovs.filter((name)=>{
          return ( name.title.toLocaleLowerCase().includes(normalizedTitle))
        });        

      return findMov;

      }else if(options.tags){
        const normalizedTag = options.tags.toLocaleLowerCase();
        const findTagMov = arrayMovs.filter((tag)=>{
          return (tag.tags.includes(normalizedTag))
        });

      return findTagMov;
      }
    })

    return promise;
  }
}

export{PelisCollection,Peli}

/*const object = new PelisCollection();
object.getById(14223).then((resultado)=>{
  console.log(resultado);
})*/


