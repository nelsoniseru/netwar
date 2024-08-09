import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';



export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');
console.log(token)
   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(401).send('unauthorized');
 }
};
