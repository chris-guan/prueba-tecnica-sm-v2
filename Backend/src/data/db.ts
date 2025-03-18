import mysql from "mysql2/promise";
import { config } from 'dotenv';
import { resolve } from 'path';

// Configura dotenv con la ruta explícita
config({ path: resolve(__dirname, '../../.env') });

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '129486',
    database: process.env.DB_NAME || 'vehiculosdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para probar la conexión
pool.getConnection()
    .then(connection => {
        console.log('Base de datos conectada exitosamente');
        connection.release();
    })
    .catch(error => {
        console.error('Error conectando a la base de datos:', error);
    });

