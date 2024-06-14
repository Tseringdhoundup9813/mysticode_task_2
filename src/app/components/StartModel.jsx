import React, { useState } from 'react'
import "../css/start.model.css"
import DifficultyLevel from './DifficultyLevel'
import { useDispatch } from 'react-redux';
import { selectRandomFunc,startFunc } from '../features/gameLogicSlice.js';
import { pointCriteria } from '../../utils/constants';
function startModel({setStartModelActive}) {
    const dispatch = useDispatch();
    const[error,setError] =useState({isError:false,message:''})
    const[betPoint,setBetPoint] = useState(1);

    
    function startHandler(){
        if(betPoint <= pointCriteria.max && betPoint > pointCriteria.min-1){
            setStartModelActive(false);
            dispatch(startFunc({bet:betPoint}))
            setTimeout(function(){
                dispatch(selectRandomFunc())
            },1000)
        }else{
            setError({isError:true,message:`please enter bet amount more than ${pointCriteria.min-1} and less then ${pointCriteria.max}`})

        }

    }
  return (
    <div className='start-model-main-wrapper'>
        <button onClick={startHandler}>Let check your luck</button>
        <label>Bet: min 1 max 10</label>
        <input type="number" 
            value={betPoint}
            placeholder='bet your point' 
            onChange={(e)=>setBetPoint(e.target.value)}/>
        {/* bet error message */}
        {
         error.isError&& <p className='bet-error-message'>{error.message}</p>
        }
        <DifficultyLevel/>
    </div>
  )
}

export default startModel