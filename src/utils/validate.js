
export function loginValidate(email,password){
    let validation = {
        emailRequired:false,
        passwordRequired:false,
    };
    if(email.length<1){
        validation.emailRequired = true;
    }else{
        validation.emailRequired = false;
    }
    if(password.length < 1){
        validation.passwordRequired = true;
    }else{
        validation.passwordRequired= false;

    }

    return validation
}
