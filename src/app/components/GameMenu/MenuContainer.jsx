import React, { useState } from 'react'
import "../../css/start.model.css"
import { useDispatch } from 'react-redux';
import { selectRandomFunc,startFunc,modelIsActiveFunc} from '../../../features/gameLogicSlice.js';
import { pointCriteria } from '../../../utils/constants.js';
import MenuView from './MenuView.jsx';
import DifficultyLevel from '../DifficultyLevel.jsx';

function MenuContainer() {
    const dispatch = useDispatch();
    const[error,setError] =useState({isError:false,message:''})
    const[betPoint,setBetPoint] = useState(1);

    
    function startHandler(){
        if(betPoint <= pointCriteria.max && betPoint >= pointCriteria.min){
            dispatch(modelIsActiveFunc())
            dispatch(startFunc({bet:betPoint}))
            setTimeout(function(){
                dispatch(selectRandomFunc())
            },1000)
        }else{
            setError({isError:true,message:`please enter bet amount more than ${pointCriteria.min-1} and less then ${pointCriteria.max}`})

    }}
    // render logic
  return <MenuView startHandler={()=>startHandler()} 
            setBetPoint={setBetPoint}
            betPoint={betPoint} 
            error={error}/>
}

export default MenuContainer