import { Link } from "react-router-dom";
import Login from "./Login";
import ImageTac2 from "../images/imageTac2.jpg";
import QuienesSomos from "./QuienesSomos";
import Contacto from "./Contacto";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <>

            <header id="home"
                className="grid grid-cols-1 min-h-screen justify-center items-center bg-gradient-to-r from-black via-gray-800 to-black bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.69), rgba(77, 24, 24, 0.45)), url(${ImageTac2})` }}
            >

                <div className="grid grid-cols-1 md:grid-cols-2">

                    <div className="flex flex-col items-center bg-black text-center text-white">
                        <h2 className="p-10 mt-10 text-5xl  font-extrabold">Bienvenidos a {''} <span className="text-teal-400">Sistema de Control Vehicular</span></h2>
                        <Login />

                    </div>
                    <div className="flex flex-col items-center justify-center text-center text-white px-4 md:px-8 lg:px-12">
                        <p className="p-4 md:p-8 lg:p-10 text-teal-300 text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                            El copiloto incondicional para maximizar el rendimiento de tu vehículo.
                        </p>

                        <p className="p-4 md:p-8 lg:p-10 text-gray-100 text-base md:text-lg italic font-bold max-w-2xl mx-auto">
                            Para disfrutar de nuestros servicios de monitoreo. Puedes dar clic en el siguiente botón para registrarte.
                        </p>

                        <button className="mt-4 md:mt-6 bg-teal-500 px-6 py-3 rounded-lg hover:bg-teal-900 text-bold cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg">
                            <Link to="/register" className="text-white text-lg md:text-xl font-semibold">
                                Regístrate Ahora
                            </Link>
                        </button>
                    </div>
                </div>

            </header>
            <QuienesSomos />
            <Contacto />
        </>
    )
}

export default Header