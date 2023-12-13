import ApplicationError from "../../../Error_Handler/error_handler.js";

export default class Users {

    constructor( _name, _email, _password, _typeOfUser,_id) {
        this._id=_id
        this._name = _name;
        this._email = _email;
        this._password = _password;
        this._typeOfUser = _typeOfUser; 
    };

    static getAllUsers() {
        return usersArray;
    }

   

    static userAuthorized(email, password) {
        const result = usersArray.find(user => email == user._email && password == user._password);
        return result;
    }

    static validUser(userId) {
        const result = usersArray.find(user => (user._id == userId));
        return result;
    }

    static userExist(email) {
        return usersArray.find(user => email == user._email);
    }
}

const usersArray = [];