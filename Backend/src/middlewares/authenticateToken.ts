import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];

    interface AuthenticatedRequest extends Request {
        user: {
            id_usuarios: number;
        };
    }

    if (!token) {
        res.status(401).json({ error: "Acceso denegado, token no encontrado." });
    }


    try {
        const decored = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
        (req as AuthenticatedRequest).user = { id_usuarios: decored as number };
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido." });
    }

};

export default authenticateToken;