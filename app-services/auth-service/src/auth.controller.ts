import { Request, Response } from 'express';
import AuthService from './auth.service';

class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const token = await AuthService.authenticateUser(email, password);
            if (!token) {
                res.status(401).json({ message: 'Authentication failed' });
            } else {
                res.status(200).json({ token });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }    
        }
    }
}

export default new AuthController()