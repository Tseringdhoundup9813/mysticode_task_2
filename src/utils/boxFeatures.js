import { boxesMetaData } from "./constants";

export function generateBoxes(){
    let boxes_list = []
    let box_row = []
    let columnMultiply = 1;
    const column = boxesMetaData.column;

    for(var i =1;i<boxesMetaData.total+1;i++){
        box_row.push({id:i,revel:false,match:false,computerSelect:false})
        if(i ===(column * columnMultiply)){
            columnMultiply += 1;
            boxes_list.push(box_row);
            box_row=[]
        }
    }
    return boxes_list
}


export  function generateRandomNumber(column,row){
    const columnRandom = Math.floor(Math.random() * boxesMetaData.column);
    const rowRandom = Math.floor(Math.random() * boxesMetaData.row);
    return {
        columnRandom,
        rowRandom
    }

}