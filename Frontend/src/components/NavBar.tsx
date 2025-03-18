import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        toast.success('Su sesión ha sido cerrada correctamente', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        navigate("/");
    };

    const handleNavigation = (sectionId: string) => {
        setMenuOpen(false);

        if (sectionId === 'quienes-somos' || sectionId === 'contacto') {
            navigate('/', { state: { scrollTo: sectionId } });
            return;
        }

        if (location.pathname === '/dashboard') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/dashboard', { state: { scrollTo: sectionId } });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex p-3 bg-black justify-between text-white items-center">
            <h1 className="text-xl ml-2 font-bold uppercase">
                Sistema De Control Vehicular
            </h1>

            {/* Iconos de redes sociales */}
            <div className="hidden md:flex space-x-4 mx-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors">
                    <FaFacebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors">
                    <FaInstagram size={20} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors">
                    <FaTiktok size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors">
                    <FaYoutube size={20} />
                </a>
            </div>

            <div className="md:hidden p-3">
                <button className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                </button>
            </div>

            <ul
                className={`bg-black items-center md:flex space-x-4 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto md:bg-transparent p-5 md:p-0 transition-transform ${menuOpen ? "block" : "hidden"
                    }`}
            >
                {isAuthenticated ? (
                    <>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <button className="cursor-pointer" onClick={() => handleNavigation('dashboard')}>Dashboard</button>
                        </li>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <button className="cursor-pointer" onClick={() => handleNavigation('marca')}>Marca</button>
                        </li>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <button className="cursor-pointer" onClick={() => handleNavigation('ubicacion')}>Ubicación</button>
                        </li>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <button className="cursor-pointer" onClick={() => handleNavigation('temperatura')}>Temperatura</button>
                        </li>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <button className="cursor-pointer" onClick={() => handleNavigation('nivel-combustible')}>Nivel Combustible</button>
                        </li>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <button className="cursor-pointer" onClick={() => handleNavigation('kilometraje')}>Kilometraje</button>
                        </li>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <button className="cursor-pointer" onClick={handleLogout}>Cerrar Sesión</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <button className="cursor-pointer" onClick={() => handleNavigation('quienes-somos')}>
                                Quienes Somos
                            </button>
                        </li>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <button className="cursor-pointer" onClick={() => handleNavigation('contacto')}>
                                Contacto
                            </button>
                        </li>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <Link to="/register" onClick={() => setMenuOpen(false)}>Registrarse</Link>
                        </li>
                        <li className="hover:bg-gray-800 cursor-pointer text-2xl md:text-base">
                            <Link to="/login" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
