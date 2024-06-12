import data from "../../public/data/users.json"
const timer = 3000;
export function loginServer(email,password){
    return new Promise((resolve,reject)=>{
        let serverPassword;
        // check email exits or not
        const emailExits = data.filter((user)=>{
            return user.email ==email;
        })
     
        if(emailExits.length < 1){
            setTimeout(function(){
                return reject({message:'email is not exits!'})
            },timer)
        }
        serverPassword = emailExits[0]?.password;
        if(serverPassword===password){
            setTimeout(function(){
                return resolve({    
                    data:emailExits[0]
                })

            },timer)

        }else{
            setTimeout(function(){
                return reject({message:'password is not match!'})
            },timer)
        }

    })

}