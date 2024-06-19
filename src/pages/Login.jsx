import React, { useState,useContext } from 'react'

// global login page css
import "../app/css/login.css"

// provider
import { AuthContext } from '../context/AuthContext.jsx';
// auth
import { validateFunc } from '../utils/auth/validate.js';
import { loginServer } from '../utils/auth/server.js';
// react router
import { useNavigate } from 'react-router-dom';

// custom tools
import { gameInitializeFunc } from '../features/gameLogicSlice.js';
import { useDispatch } from 'react-redux';



function Login() {
    const authContext = useContext(AuthContext);
    const dispatch = useDispatch();
    const[user,setUser] = useState({email:'',password:''})
    const[validate,setValidate] = useState()
    const [isLoading,setIsLoading] = useState(false);
    const[error,setError] = useState();
    const[isSuccess,setIsSuccess] = useState(false);
    

    
    async function submitHandler(event){
        event.preventDefault();
        // set validation object
        setValidate(validateFunc(user.email,user.password))
        setError();
        // get validation object
        const validation = validateFunc(user.email,user.password)
        if(!validation.emailError &&!validation.passwordError){

            try{
                setIsLoading(true);
                const res = await loginServer(user.email,user.password);
                const data = res.data;
                // save user information handler  auth_context
                authContext.dispatch({type:'login',payload:{user:data}})
                setIsLoading(false);
                setIsSuccess(true);
                // initialize game 
                dispatch(gameInitializeFunc())


            }catch(err){

            setError(err.message);
            setIsLoading(false);
            setIsSuccess(false);
            console.log(err);

            }
        }
   
  }

    
  return (
    <div className='login-parent-wrapper'>
    <form onSubmit={submitHandler} className='login-form-container'>
        <h1>Login Form</h1>
        {
            isSuccess&&<p className='server-message server-success'>successfully login</p>
        }
        {
          error&&<p className='server-message server-error'>{error}</p>
        }
        <div>
            <input type="text" 
                placeholder='enter  email'
                value={user.email}
                className={validate?.emailRequired?'required':''}
                onChange={(e)=>setUser({...user,email:e.target.value})}
            />
            {
                validate?.emailRequired&&<p className='error-message'>email is required field!</p> 
            }
            
        </div>
        <div>
            <input 
                type="text"  
                placeholder='enter password'
                value={user.password}

                className={validate?.passwordRequired?'required':''}
                onChange={(e)=>setUser({...user,password:e.target.value})}
            />
            {
                validate?.passwordRequired&&<p className='error-message'>password is required field!</p> 
            }
        </div>
        <button>{isLoading?"...loading":'login'}</button>
    </form>
    </div>
  )
}

export default Login