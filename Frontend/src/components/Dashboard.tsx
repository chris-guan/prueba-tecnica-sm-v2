import { useEffect } from "react";
import ImageTac from "../images/imageTac.jpg"
import { useNavigate, useLocation } from "react-router-dom";
import Marca from "./Marca";
import Ubicacion from "./Ubicacion";
import Temperatura from "./Temperatura";
import NivelCombustible from "./NivelCombustible";
import Kilometraje from "./Kilometraje";
// import { useVehiculos } from "../hooks/useVehiculos";



export const Dashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    // const { data: products, isLoading, error } = useVehiculos();

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message} </div>;
    // if (!products) return <div>No Albums found...</div>

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // cuando no hay token devuelve a la pagina de inicio
        }
    }, [navigate]);

    useEffect(() => {
        // Verificar si hay una sección a la que hacer scroll
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            // Limpiar el state después de hacer scroll
            window.history.replaceState({}, document.title);
        }
    }, [location]);



    return (
        <>
            <section id="dashboard" className="w-screen min-h-screen bg-cover bg-center from-black via-gray-800 to-black bg-black pt-20" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.81), rgba(20, 34, 9, 0.29)), url(${ImageTac})` }}>
                <h1 className="p-7 text-4xl text-center text-white font-extrabold"><span className="text-teal-500">Hola,</span> Esta es la información de tu vehiculo.</h1>
                <em className="flex p-5 mb-10 text-lg text-white justify-center text-center">Los datos son estaticos hasta el momento. Esta es una muestra de Frontend.</em>
                <div className="w-screen grid grid-cols-1 gap-4 px-4">
                    <section id="marca" className="from-black via-gray-800 to-black bg-gray-800">
                        <Marca />
                    </section>
                    <section id="ubicacion" className="from-black via-gray-800 to-black bg-gray-800">
                        <Ubicacion />
                    </section>
                    <section id="temperatura" className="from-black via-gray-800 to-black bg-gray-800">
                        <Temperatura />
                    </section>
                    <section id="nivel-combustible" className="from-black via-gray-800 to-black bg-gray-800">
                        <NivelCombustible />
                    </section>
                    <section id="kilometraje" className="from-black via-gray-800 to-black bg-gray-800">
                        <Kilometraje />
                    </section>
                </div>
            </section>
        </>
    );
};