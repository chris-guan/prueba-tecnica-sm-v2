import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-gray-300">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna 1 - Cuenta */}
                    <div className="flex flex-col">
                        <h3 className="text-white font-bold mb-4">Tu Cuenta</h3>
                        <Link to="/register" className="hover:text-white mb-2">Registro</Link>
                        <Link to="/login" className="hover:text-white mb-2">Iniciar Sesión</Link>
                    </div>

                    {/* Columna 2 - Información */}
                    <div className="flex flex-col">
                        <h3 className="text-white font-bold mb-4">Información</h3>
                        <Link to="/about" className="hover:text-white mb-2">Quiénes Somos</Link>
                        <Link to="/terms" className="hover:text-white mb-2">Términos y Condiciones</Link>
                    </div>

                    {/* Columna 3 - Contacto */}
                    <div className="flex flex-col">
                        <h3 className="text-white font-bold mb-4">Contacto</h3>
                        <Link to="/contact" className="hover:text-white mb-2">Contáctanos</Link>
                        <a href="mailto:info@ejemplo.com" className="hover:text-white mb-2">infocontrolvehicular@correo.com</a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 pt-8 border-t border-gray-700 text-sm">
                    © 2025 Con fines de evaluación de conocimientos en Frontend.
                </div>
            </div>
        </footer>
    );
}

export default Footer;