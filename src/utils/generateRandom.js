
import { boxsMetaData } from "./constants";

export  function generateRandomNumber(column,row){
    const columnRandom = Math.floor(Math.random() * boxsMetaData.column);
    const rowRandom = Math.floor(Math.random() * boxsMetaData.row);
    return {
        columnRandom,
        rowRandom
    }

}