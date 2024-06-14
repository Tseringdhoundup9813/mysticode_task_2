
export function validateFunc(email,password){
    let validate = {
        emailError:false,
        passwordError:false,
    };
    
    if(email.length<1){
        validate.emailError = true;
    }else{
        validate.emailError = false;
    }
    if(password.length < 1){
        validate.passwordError = true;
    }else{
        validate.passwordError= false;

    }

    return validate
}
