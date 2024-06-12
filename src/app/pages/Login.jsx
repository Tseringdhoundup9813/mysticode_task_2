import React, { useState } from 'react'
import "../css/login.css"
import { loginValidate } from '../../utils/validate';
import { loginServer } from '../../utils/server';
import { useNavigate } from 'react-router-dom';
import { gameInitializeFunc } from '../features/gamelogicSlice';
import { useDispatch } from 'react-redux';
import { setToLocalStorage } from '../../utils/localstorage';
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[user,setUser] = useState({email:'',password:''})
    const[validate,setValidate] = useState()
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState();
    const[error,setError] = useState();
    const[isSuccess,setIsSuccess] = useState(false);

    async function submitHandler(event){
    event.preventDefault();
    // set validation object
    setValidate(loginValidate(user.email,user.password))
    setError();
    // get validation object
    const validation = loginValidate(user.email,user.password)
    if(!validation.emailRequired &&!validation.passwordRequired){

         try{
            setIsLoading(true);
            const res = await loginServer(user.email,user.password);
            const data = res.data;
            setToLocalStorage('user',{email:data.email,username:data.username})
            setIsLoading(false);
            setIsSuccess(true);
            setUser({email:'',password:''})
            // game 
            // initialize game 
            dispatch(gameInitializeFunc())
            navigate('/home')

        }catch(err){

         setError(err.message);
         setIsLoading(false);
         setIsSuccess(false);

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