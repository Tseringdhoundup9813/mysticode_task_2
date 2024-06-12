import { createSlice } from "@reduxjs/toolkit";
import { generateBoxs } from "../../utils/generateBoxs";
import { generateRandomNumber } from "../../utils/generateRandom";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/localstorage";
import { selectLimit } from "../../utils/constants";


const initialState={
   boxlist:generateBoxs(),
   selectCount:selectLimit,
   computerSelectedlist:[],
   playerSelectedBoxs:[],
   matchCount:0,
   difficultyLevel:{name:'low',box:3,points:2},
   balance:getFromLocalStorage('balance'),
   bet:1,
   win:false,
   loose:false,
   countAnimate:0,
   

}

const gamelogicSlice = createSlice({
    name:'gameLogic',
    initialState,
    reducers:{

        // initial boxs when game start
        gameInitializeFunc:function(state){
            // setToLocalStorage('boxlist',generateBoxs())
            // setToLocalStorage('balance',50);
            state.boxlist = generateBoxs();
            state.selectCount= selectLimit;
            state.matchCount = 0;
            state.balance = getFromLocalStorage('balance');
        },
        // restart game
        restartFunc:function(state){
            setToLocalStorage('boxlist',generateBoxs())
            setToLocalStorage('balance',50);
            state.boxlist = generateBoxs('boxlist');
            state.selectCount= selectLimit;
            state.playerSelectedBoxs=[];
            state.matchCount = 0;
            setToLocalStorage('win',false);
            setToLocalStorage('loose',false);
            
            state.win=false;
            state.loose=false;
          
        },
        // when click start button run this func
        startFunc:function(state,action){
             if(state.balance < 1)return
             state.bet = action.payload.bet
        },

        // handle difficulty level 
        difficultyLevelFunc:function(state,action){
            state.difficultyLevel = action.payload;
        },
        // select box when user click on box
        // set box revel to true if match
        selectBoxFunc:function(state,action){
            // check first player has selected the box 
            if(!state.playerSelectedBoxs.includes(action.payload.id)){
                let boxs = state.boxlist;
                const playerSelectBox = boxs[action.payload.column][action.payload.row];
                playerSelectBox.revel = true;
                state.playerSelectedBoxs.push(playerSelectBox.id)
                setToLocalStorage('boxlist',boxs)
                state.boxlist = getFromLocalStorage('boxlist')
                state.selectCount -=1;
            }
        },
        selectRandomFunc:function(state,action){
          
            let boxs = state.boxlist;
            const computerSelectedlist = []
            for(var i=0;i<selectLimit+1;i++){
                const columnRandom = generateRandomNumber().columnRandom
                const rowRandom = generateRandomNumber().rowRandom
                // select the random box and store in computerselectbox varaible
                const computerSelectedBox =boxs[rowRandom][columnRandom]
                // set computerselect box to true
                computerSelectedBox.computerSelect = true;
                computerSelectedBox.revel=false;
           
                // check the boxes that computer select is match to the player selected boxes
                state.computerSelectedlist.push(computerSelectedBox.id);
                for(var a=0;a<state.playerSelectedBoxs.length;a++){
                    if(state.playerSelectedBoxs[a]===computerSelectedBox.id){
                        state.boxlist[rowRandom][columnRandom].match =true;
                        state.matchCount+=1;
                
                    }}
                
                }
                // set bo
               state.boxlist = boxs;
            
           
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
        // countdonw animate 
        animateCountFunc:function(state){
            state.countAnimate+=1
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
        restartFunc
        } = gamelogicSlice.actions;
export default gamelogicSlice.reducer;