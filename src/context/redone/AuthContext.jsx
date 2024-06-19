import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    user: null,
    setUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    checkAndRedirect: () => {},

    // Other possible

    // JWT access token?
    access_token: null,
    // Encrypt password before sending it to the server
    encryptString: () => {},
    decryptString: () => {},
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const login = (user) => {
        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
    };

    // Call it manually or set it inside a useEffect, upto dev's choice.
    const checkAndRedirect = () => {
        const navigate = useNavigate();
        if (!isLoggedIn) {
            navigate('/login');
        }else {
            navigate('/home');
        }
    };

    const passData = { user, isLoggedIn, login, logout, checkAndRedirect };

    return (
        <AuthContext.Provider value={passData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

// Use in Login.jsx
function Login() {
    const { user, isLoggedIn, login } = useContext(AuthContext);
    const dispatch = useDispatch();

    const[validate,setValidate] = useState()
    const [isLoading,setIsLoading] = useState(false);
    const[error,setError] = useState(null);
    const[isSuccess,setIsSuccess] = useState(false);

    async function submitHandler(event){
        event.preventDefault();
        // set validation object
        const validation = validateFunc(user.email,user.password)

        setValidate(validation)
        setError(null);
        // get validation object
        
        if(!validation.emailError &&!validation.passwordError){
            try{
                setIsLoading(true);
                const res = await loginServer(user.email,user.password);
                const data = res.data;
                // save user info using `login` function from AuthContext
                login(data);

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
}