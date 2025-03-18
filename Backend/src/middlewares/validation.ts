import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
    const { nombre_usuario, email, password } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre_usuario || !email || !password) {
        res.status(400).json({
            message: 'Todos los campos son requeridos'
        });
        return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({
            message: 'Formato de email inválido'
        });
        return;
    }

    // Validar longitud del nombre de usuario
    if (nombre_usuario.length < 3 || nombre_usuario.length > 50) {
        res.status(400).json({
            message: 'El nombre debe tener entre 3 y 50 caracteres'
        });
        return;
    }

    // Validar contraseña
    if (password.length < 8) {
        res.status(400).json({
            message: 'La contraseña debe tener al menos 8 caracteres'
        });
        return;
    }

    // Si todas las validaciones pasan, continuar
    next();
}; 