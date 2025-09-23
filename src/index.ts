import minimist from "minimist";
import { PelisController } from "./controllers";


function parseaParams(argv) {
  const parse = minimist(argv);
  
  let resultado
  const obj={}
  if(parse._[0]==="get"){
    obj['get']={id:Number(parse._[1])}

    resultado=obj
  
    
    // console.log(parse)

  }else if(parse._[0]==='add'){
    obj[parse._]={id:parse.id,title:parse.title,tags:parse.tags}
    resultado=obj

  }
  else if(parse._[0]==='search'){
    if(parse.title && parse.tag){
      obj[parse._]={title:parse.title,tag:parse.tag}
      resultado=obj
    }
     else if(parse.title){
      obj[parse._]={title:parse.title}
      resultado=obj
    }
    else if(parse.tag){
      obj[parse._]={tag:parse.tag}
      resultado=obj
    }
   
    
  }
  else{
    resultado=obj
  }
 return resultado




  
 


  
}


function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params)
const controllers=new PelisController();


if(params.get){
  
  controllers.getOne(params).then(res=>console.log(res))
}
else if(params.add){
  controllers.add(params.add).then(res=>console.log(res) )
}
else if(params){
  controllers.get(params).then(res=>console.log(res))
}




  
}
main()


