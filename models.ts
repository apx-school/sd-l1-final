import { Console } from "console";
import * as jsonfile from "jsonfile";
import { PelisController } from "./controllers";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis:Peli[] = [];
  getAll(): Promise<Peli[]>{//listo
    return jsonfile.readFile("./pelis.json").then((lista) => {
      this.pelis = lista;
      return lista
    });
  }
  getById(id:number){//listo
    return this.getAll().then((lista)=>{
      const encontrado = lista.find((item)=>{
        return item.id == id;
      })
      return encontrado;
    })
  }
  search(options:any){//listo
    if(options.tag && options.title){
      return this.getAll().then((lista)=>{
        const resultado = lista.filter((item)=>{
          return item.title.includes(options.title);
        })
        const listaFinal = resultado.filter((i)=>{
          return i.tags.includes(options.tag)
        })
        return listaFinal;
      })
    }else if(options.title){
      return this.getAll().then((lista)=>{//listo
        const listaAMostrar = lista.filter((item)=>{
          return item.title.includes(options.title)
        });
        return  listaAMostrar;
        
      });
    }else if(options.tag){
      return this.getAll().then((lista)=>{//listo
        const tagAMostrar = lista.filter((item)=>{
          return item.tags.includes(options.tag)
        })
        return tagAMostrar
      })
    }
    
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      }else{
        this.pelis.push(peli);
        const lista = this.pelis;
        const promesaDos = jsonfile.writeFile("./pelis.json", lista).then(()=>{
          return true;
        });
        return promesaDos;
        
      }
      
    });

    return promesaUno;
  }

}
export { PelisCollection, Peli };
/*const objeto = new PelisCollection();
objeto.search({"tag":"accion"}).then((resultado)=>{
  console.log(resultado)
})*/

