import * as js from "jsonfile";

const jsonPath = __dirname + '/pelis.json';

class Peli {
  id: number;
  title: string;
  tags: string[];
  rating: number;
}

class PelisCollection {
  
  data: Peli[];

  async load(): Promise<any>{
    this.data = await js.readFile(jsonPath);
  }

  async getAll(): Promise<Peli[]> {
    return this.data;
  }

  async getById(id:number): Promise<Peli>{
    const getResult =  this.data.find(e => e.id == id);
    return getResult;
  }

  async search(options: {title: string} | {tag: string}): Promise<Peli[]>{
    const optionsKey = Object.keys(options)[0];
    var searchResult = [];

    (optionsKey == "title") ?
    this.data.forEach(e=> {if(e.title.toUpperCase().includes(options[optionsKey].toUpperCase())) searchResult.push(e)}):
    (optionsKey == "tag") ?
    this.data.forEach(e=>{e.tags.forEach(t=> {if(t.toUpperCase() == options[optionsKey].toUpperCase())searchResult.push(e)})}):
    null;

    if(searchResult.length == 0){
      console.log(`La busqueda no arrojó ningún resultado`);
      return;
    }
    return searchResult;
  }

  async add(peli: Peli): Promise<boolean>{
    if(await this.getById(peli.id)) {
      return false;
    }else{
     this.data.push(peli);
     await js.writeFile(jsonPath,this.data);
     return true;
    }
  }
}

export { PelisCollection, Peli };

// async function main(){
//   const foo = new PelisCollection();
//   await foo.load();
//   console.log(foo.data);
//   (await foo.add({id:31,title:'One Piece: Red',tags:["acción","animé","humor","piratas","fantasía"],rating: 9.8})) ?
//   console.log('Se agrego la peli') :
//   console.log('No se agregó la peli');
// }

// main();
