import { createContext, useEffect, useReducer } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorage";
// react router dom
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext()

const initialState={
    user:getFromLocalStorage('user')||undefined
}

function reducerFunc(state,action){
    switch(action.type){
        case "login":
            const {email,username} = action.payload.user;
            setToLocalStorage('user',{email,username})
            return {
                user:getFromLocalStorage('user')
            }
        default:
            return state;

    }

}


export function AuthContextProvider({children}){
    const navigate = useNavigate();
    const [state,dispatch] = useReducer(reducerFunc,initialState);
    useEffect(()=>{
        if(!state.user){
            navigate('/login');
        }else{
            navigate('/home')
        }
    },[state.user])
   


    return(
        <AuthContext.Provider value={{state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}