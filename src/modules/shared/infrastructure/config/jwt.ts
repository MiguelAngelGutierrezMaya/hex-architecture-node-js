import jwt from 'jsonwebtoken';
import {envs} from "./envs";

const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {

    static async generateToken(payload: Object, duration: string = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            // To do: generate secret key
            jwt.sign(payload, JWT_SECRET, {
                expiresIn: duration
            }, (err, token) => {
                if (err) {
                    return resolve(null);
                }
                resolve(token || null);
            });
        });
    }

    static async verifyToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) {
                    return resolve(null);
                }

                if (!decoded) {
                    return resolve(null);
                }

                resolve(decoded as T);
            });
        });
    }
}