import Express from "express";
import { config } from 'dotenv';
import { resolve } from 'path';
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { validateRegistration } from './middlewares/validation';
import authenticateToken from "./middlewares/authenticateToken";
import { Request, Response, RequestHandler } from "express";
import mysql from "mysql2/promise";
import { pool } from "./data/db";

// Configura dotenv con la ruta explícita
config({ path: resolve(__dirname, '../.env') });

console.log('Ruta del proceso:', process.cwd());
console.log('Verificando variables de entorno:');
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const app = Express();

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET no está definido en las variables de entorno');
    process.exit(1);
}

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // límite de 100 peticiones por ventana
});
app.use(limiter);

app.use(Express.json({ limit: '10kb' }));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

export async function getData(query: string) {
    const [rows] = await pool.query(query);
    return rows;
}

app.get('/', (req, res) => {
    res.send('App de datos prueba.');
});

app.get('/api/data', async (req, res) => {
    try {
        console.log('Procesando...');
        const data = await getData('SELECT * FROM tb_usuarios');
        console.log('Datos:', data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error al obtener datos:', err);
        res.status(500).send('Error al obtener datos');
    }
});

app.post('/api/register', validateRegistration, (async (req: Request, res: Response) => {
    const { nombre_usuario, email, password } = req.body;
    try {
        // Verificar conexión a la base de datos
        const connection = await pool.getConnection();
        console.log('Conexión establecida');

        const [existingUser]: any = await connection.query(
            'SELECT id_usuarios FROM tb_usuarios WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            res.status(400).json({
                message: 'El correo electrónico ya está registrado'
            });
            return;
        }

        const hashedPass = await bcrypt.hash(password, 15);

        try {
            await connection.beginTransaction();
            const [result]: any = await connection.query(
                'INSERT INTO tb_usuarios (nombre_usuario, email, password) VALUES (?, ?, ?)',
                [nombre_usuario, email, hashedPass]
            );
            await connection.commit();

            res.status(201).json({
                message: 'Usuario creado exitosamente',
                userId: result.insertId
            });
        } catch (error) {
            console.error('Error específico:', error);
            res.status(500).json({
                message: 'Error al procesar el registro',
                error: error.message // Solo en desarrollo
            });
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('Error de conexión:', err);
        res.status(500).json({
            message: 'Error de conexión a la base de datos',
            error: err.message // Solo en desarrollo
        });
    }
}) as RequestHandler);

app.post('/api/login', (async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const [users]: any = await pool.query(
            'SELECT id_usuarios, email, password FROM tb_usuarios WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        const user = users[0];
        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        const token = jsonwebtoken.sign(
            {
                userId: user.id_usuarios
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
                algorithm: 'HS256'
            }
        );

        res.status(200).json({ token });
        return;
    } catch (err) {
        console.error("Error en autenticación:", err);
        res.status(500).json({
            message: "Error en el servidor"
        });
        return;
    }
}) as RequestHandler);

interface AuthenticatedRequest extends Request {
    user: {
        id_usuarios: number;
    };
}
app.get('/api/vehiculo', authenticateToken, (async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id_usuarios;

        const [result]: any = await pool.query("SELECT * FROM tb_vehiculos WHERE id_usuario = ?", [userId]);

        if (!result.length) {
            res.status(404).json({ error: 'No Se Encontraron Vehiculos De Este Usuario' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener informacion:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}) as RequestHandler);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

