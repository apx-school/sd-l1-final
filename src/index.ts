import {PelisCollection,Peli} from "./models";
import {PelisController,Options} from "./controllers";
import Minimist from "minimist";

function ParseaParams(Argv) {
  const ArgParMin=Minimist(Argv);
  return ArgParMin;
};

async function Main(){
  const ParamsPars=ParseaParams(process.argv.slice(2));
  const Defi=ParamsPars._[0];
  const IDP=ParamsPars.id;
  const TituloP=ParamsPars.title;
  const TagsP=ParamsPars.tags;
  const Controlador=new PelisController();
  const Coleccion=new PelisCollection();
  const NuevaPeli:Peli={
    id:IDP,
    title:TituloP,
    tags:TagsP
  };
  if(Defi=="add"){
    const Resultado=await Controlador.add(NuevaPeli);
    console.log(Resultado);
  };
  
  if(Defi=="get"){
    const Resultado=await Controlador.getOne(IDP);
    console.log(Resultado);
  };
  if(Defi=="search"){
    if(NuevaPeli.title){
      const Resultado=Coleccion.search(TituloP);
      console.log(Resultado);
    }else if(NuevaPeli.tags){
      const Resultado=await Coleccion.search(TagsP);
      console.log(Resultado);
    };
  };
};

Main();