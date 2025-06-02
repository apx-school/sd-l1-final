import {PelisCollection,Peli} from "./models";

type Options={
  id?:number;
  search?:{
    title?:string;
    tags?:string;
  };
};

class PelisController {
  ControladorP:PelisCollection;
  constructor(){
    this.ControladorP=new PelisCollection();
  };
  get(OPp?:Options):Promise<any>{
    if(OPp){
      const N=OPp.id
      return this.ControladorP.getById(N);
    }else{
      return this.ControladorP.getAll();
    };
  };
  getOne(GOOp:Options):Peli{
    return this.get(GOOp)[0];
  };
  add(APp:Peli){
    return this.ControladorP.add(APp);
  };
};

export {PelisController,Options};