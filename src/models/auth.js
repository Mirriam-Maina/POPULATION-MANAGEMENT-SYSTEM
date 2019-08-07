import passwordHash from 'password-hash';
import connection from '../database/config';
class User{
    
    constructor(firstName, lastName, email, password, address){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.address = address
    }

    async addUser(){
            const hashedPassword =  this.hashPassword(this.password);
            const db = await connection();
            const addUser = await db.collection('users').insertOne({firstName: this.firstName, lastName: this.lastName, email: this.email, password: hashedPassword, address: this.address});
            const insertedUser = await db.collection('users').findOne({'_id': addUser.insertedId})
            return insertedUser;
    }

    hashPassword(password){
        return passwordHash.generate(password);
    }

    static async signInUser(email, password){
        const db = await connection();
        const availableUser = await db.collection('users').findOne({'email':email});
        if(availableUser){
            const storedPassword = availableUser.password;
            const verifyPassword = passwordHash.verify(password, storedPassword)
            if(verifyPassword){
                return availableUser
            }
            else{
                return false
            }
        }
        else {
            return false
        }

    }
}

export default User;