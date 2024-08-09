import { Request, Response } from 'express';
import UserService from './user.service';
import redisClient from '../../../utils/redis';
import { v4 as uuidv4 } from 'uuid';

class UserController {
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }      
          }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        redisClient.get(userId, async (err, cachedUser) => {
            if (cachedUser) return res.status(200).json(JSON.parse(cachedUser));
        
                try {
                    const user = await UserService.getUserById(userId);
                    if (!user) return res.status(404).json({ message: 'User not found' });
                      redisClient.setex(userId, 3600, JSON.stringify(user));
                      return  res.status(200).json(user);
                    
                } catch (error) {
                    if (error instanceof Error) {
                        res.status(400).json({ error: error.message });
                    }               
                 }
        
        });
    }

    async updateUser(req: Request, res: Response){
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            if (!user) return res.status(404).json({ message: 'User not found' });
               return res.status(200).json(user);
            
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }       
         }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user = await UserService.deleteUser(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            return res.status(200).json({ message: 'User deleted' });
            
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }      
          }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const id = uuidv4();
            redisClient.get(id, async (err, cachedUsers) => {
                if (cachedUsers) return res.status(200).json(JSON.parse(cachedUsers));
                const users = await UserService.getAllUsers();
                if (!users) return res.status(404).json({ message: 'User not found' });
                redisClient.setex(id, 3600, JSON.stringify(users));
                 return res.status(200).json(users); 
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }        }
    }
}

export default new UserController();
