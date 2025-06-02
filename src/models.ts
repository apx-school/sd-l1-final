import * as Jsonfile from "jsonfile";
import "./pelis.json";

class Peli{
  id:number;
  title:string;
  tags:string[];
};

type SearchOptions={title?:string;tags?:string};

class PelisCollection{
  add(Ap:Peli):Promise<boolean>{
    const Promesa1=this.getById(Ap.id).then((IDPEp)=>{
      if(IDPEp){
        return false;
      }else{
        const TodaLaLista=Jsonfile.readFile("pelis.json");
        const DatosPeli=Ap;
        const Promesa2=Jsonfile.writeFile("./pelis.json",DatosPeli);
        TodaLaLista[TodaLaLista.length+1]=Promesa2;
        return Promesa2.then(()=>{
          return true;
        });
      };
    });
    return Promesa1;
  };

  getAll():Promise<Peli[]>{
    return Jsonfile.readFile("pelis.json").then((GAp)=>{
      return GAp;
    });
  };
  
  getById(GBIDp:number):Promise<Peli>{
    const IDObtenida=this.getAll().then((GBIDGAp)=>{
      const IDEncontrada=GBIDGAp.find((GBIDGAp2)=>{
        return GBIDGAp2.id==GBIDp;
      });
      return IDEncontrada;
    });
    return IDObtenida;
  };
  
  async search(SOp:SearchOptions):Promise<Peli[]>{
    const ListaPelis=await this.getAll();
    const LisFil=ListaPelis.filter((SFp)=>{
      var Val=false;
      if(SOp.tags){
        Val=true;
        return SFp;
      };
      if(SOp.title){
        Val=true;
        return SFp;
      };
      return Val;
    });
    return LisFil;
  };
};

export {PelisCollection,Peli};