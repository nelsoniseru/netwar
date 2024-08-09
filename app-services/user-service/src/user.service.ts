import User, { IUser } from './user.models';
import bcrypt from 'bcrypt';

class UserService {
    async createUser(data: IUser): Promise<IUser> {
     let existingUser = await User.findOne({email:data.email})
     if (existingUser) {
        throw new Error('User already exists');
    }        
        const user = new User(data);
        const saltRounds = 8
        user.password = await bcrypt.hash(user.password, saltRounds);
        await user.save();
        return user;
    }

    async getUserById(id: string): Promise<IUser | null> {
        return User.findById(id);
    }

    async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return User.findByIdAndDelete(id);
    }

    async getAllUsers(): Promise<IUser[]> {
        return User.find();
    }
}

export default new UserService();
