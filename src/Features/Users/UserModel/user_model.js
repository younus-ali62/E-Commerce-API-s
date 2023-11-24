export default class Users{

    constructor(_id,_name,_email,_password,_typeOfUser){
        this._id=_id;
        this._name=_name;
        this._email=_email;
        this._password=_password;
        this._typeOfUser=_typeOfUser;
    };

    static getAllUsers(){
        return usersArray;
    }

    static signUpUser({name,email,password,typeOfUser}){
        const newUser=new Users(
            usersArray.length+1,
            name,
            email,
            password,
            typeOfUser
        );
        usersArray.push(newUser);
        return newUser;
    };

    static signInUser({email,password}){

        const result=usersArray.find(user=> {
            return (
                (user._email==email && user._password==password)
            )
        });
        return result;
    }

    static userAuthorized(email,password){
        const result=usersArray.find(user=> email==user._email && password==user._password);
        return result;
    }
}

const usersArray=[];