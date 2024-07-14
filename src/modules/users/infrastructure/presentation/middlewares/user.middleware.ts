import {Request, Response, NextFunction} from "express";
import {JwtAdapter, UserModel} from "../../../../shared";

export class UserMiddleware {
    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers['authorization'];

        if (!authorization) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        if (!authorization.startsWith('Bearer ')) {
            return res.status(401).json({message: 'Invalid Bearer token'});
        }

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload: { id: string, email: string } = await JwtAdapter.verifyToken<{
                id: string,
                email: string
            }>(token) as { id: string, email: string };

            if (!payload) {
                return res.status(401).json({message: 'Unauthorized'});
            }

            const user = await UserModel.findById(payload.id);

            if (!user) {
                return res.status(401).json({message: 'Unauthorized'});
            }

            req.body.payload = payload;
            req.body.token = token;
            req.body.user = user;

            next();
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
}