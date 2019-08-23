import passwordHash from 'password-hash';
class User{
    
    constructor(firstName, lastName, email, password, gender, county, constituency, ward){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.gender = gender
        this.county = county
        this.constituency = constituency
        this.ward = ward
    }

    async addUser(){
            const hashedPassword =  this.hashPassword(this.password);
            const addUser = await db.collection('users').insertOne({firstName: this.firstName, lastName: this.lastName, email: this.email, 
                            password: hashedPassword, gender: this.gender, county: this.county, constituency: this.constituency, ward: this.ward });
            const insertedUser = await db.collection('users').findOne({'_id': addUser.insertedId})
            return insertedUser;
    }

    hashPassword(password){
        return passwordHash.generate(password);
    }

    static async signInUser(email, password){
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