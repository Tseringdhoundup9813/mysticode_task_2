import { boxsMetaData } from "./constants";

export function generateBoxs(){
    let boxslist = []
    let boxrow = []
    let columnMultiply = 1;
    const column = boxsMetaData.column;

    for(var i =1;i<boxsMetaData.total+1;i++){
        boxrow.push({id:i,revel:false,match:false,computerSelect:false})
        if(i ===(column * columnMultiply)){
            columnMultiply += 1;
            boxslist.push(boxrow);
            boxrow=[]
        }
        
        
    }
    return boxslist
}