import jwt from 'jsonwebtoken';
import User from '../../user-service/src/user.models'
import bcrypt from 'bcrypt'
class AuthService {
    async authenticateUser(email: string, password: string){
        const user = await User.findOne({ email:email});
        console.log(email)
        if (!user) {
            throw new Error('Invalid Credentials');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid Credentials');
        }

        // Generate a JWT token if the password matches
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || '', 
            { expiresIn: process.env.EXPIRES_IN}
        );

        return token;
      
    }
}

export default new AuthService();