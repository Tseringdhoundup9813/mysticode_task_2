import { createSlice } from "@reduxjs/toolkit";
// custom tools
import { generateBoxes,generateRandomNumber } from "../../utils/boxFeatures";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/localStorage";
// constant variable
import { selectLimit,pointCriteria} from "../../utils/constants";


const initialState={
   boxes_list:generateBoxes(),
   selectCount:selectLimit,
   playerSelectedBoxes:[],
   computerSelected_list:[],
   matchCount:0,
   difficultyLevel:{name:'low',box:3,points:2},
   balance:getFromLocalStorage('balance'),
   bet:1,
   win:false,
   loose:false,
   selectMaxReach:false,

}

const gameLogicSlice = createSlice({
    name:'gameLogic',
    initialState,
    reducers:{

        // initial boxes when game start
        gameInitializeFunc:function(state){
            state.boxes_list = generateBoxes();
            state.selectCount= selectLimit;
            state.matchCount = 0;
            state.balance = getFromLocalStorage('balance');
        },
        // restart game
        restartFunc:function(state){    
            state.computerSelected_list.map((item)=>{
                state.boxes_list[item.row][item.column].computerSelect = false;
                state.boxes_list[item.row][item.column].match = false;
            })
            state.win=false;
            state.loose=false;
            state.matchCount=0;

          
        },


        // when player click "start button", run this func
        // initialize bet amount
        startFunc:function(state,action){
             if(state.balance < pointCriteria.min)return
             state.bet = action.payload.bet
        },

        // handle difficulty level 
        difficultyLevelFunc:function(state,action){
            state.difficultyLevel = action.payload;
        },
        // select box when user click on box
        // set box revel to true if match
        selectBoxFunc:function(state,action){
            if(state.win||state.loose)return;
            state.selectMaxReach=true;
            state.selectCount
            let boxes = state.boxes_list;
            const playerSelectBox = boxes[action.payload.column][action.payload.row];
            // check first player has selected the box 
            if(!state.playerSelectedBoxes.includes(action.payload.id)&&state.selectCount>0){
                playerSelectBox.revel = true;
                state.playerSelectedBoxes.push(playerSelectBox.id)
                state.selectCount -=1;
                state.selectMaxReach=false;
                
            }else if(state.playerSelectedBoxes.includes(action.payload.id)){
                state.selectMaxReach=false;
                state.selectCount +=1;
                playerSelectBox.revel = false;
                const deselect_list = state.playerSelectedBoxes.filter((item)=>{
                    return item !==action.payload.id;
                })
                state.playerSelectedBoxes = deselect_list;
       
    
            }
        },
        selectRandomFunc:function(state,action){
          
            let boxes = state.boxes_list;
            const match_list = [];
            for(var i=0;i<selectLimit+1;i++){
                const columnRandom = generateRandomNumber().columnRandom
                const rowRandom = generateRandomNumber().rowRandom
                // select the random box and store in computerSelectBox variable
                const computerSelectedBox =boxes[rowRandom][columnRandom]
                // set computer_select box to true
                computerSelectedBox.computerSelect = true;
                state.computerSelected_list.push({row:rowRandom,column:columnRandom})
                
           
                // check whether, the  computer select boxes is match to the player selected boxes
                for(var a=0;a<state.playerSelectedBoxes.length;a++){
                    if(state.playerSelectedBoxes[a]===computerSelectedBox.id &&!match_list.includes(computerSelectedBox.id)){
                        match_list.push(state.boxes_list[rowRandom][columnRandom].id);
                        state.boxes_list[rowRandom][columnRandom].match =true;
                        state.matchCount+=1;
                
                    }}
                
                }
                // set boxes
               state.boxes_list = boxes;
            
           
            // check win or not
            if(state.matchCount >= state.difficultyLevel.box){
                state.win = true;
                const betMultiply = state.difficultyLevel.points * state.bet;
                setToLocalStorage('balance',state.balance+betMultiply);
                state.balance =getFromLocalStorage('balance');
                state.countAnimate=0;
            }else{
                state.loose = true;
                setToLocalStorage('balance',state.balance-state.bet);
                state.balance =getFromLocalStorage('balance');
                state.countAnimate=0;
            }

        },
        selectReachAnimateFunc(state){
            state.selectMaxReach=false;
        }
      

    }
})

export const {
        startFunc,
        selectBoxFunc,
        selectRandomFunc,
        difficultyLevelFunc,
        gameInitializeFunc,
        animateCountFunc,
        restartFunc,
        selectReachAnimateFunc,
        
        } = gameLogicSlice.actions;
export default gameLogicSlice.reducer;