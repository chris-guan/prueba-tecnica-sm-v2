import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`¡Bienvenido ${email}!`, {
                    position: "top-right",
                    autoClose: 2000,
                });
                localStorage.setItem('token', data.token);
                login();
                navigate('/dashboard');
            } else {
                toast.error(data.message || "Error al iniciar sesión", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (err) {
            console.error('Error al conectar con el servidor:', err);
            toast.error('Error al conectar con el servidor', {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            <section className="p-5 min-h-screen bg-black bg-cover bg-center from-black via-gray-800 to-black">
                <h1 className="p-5 text-3xl text-center text-white font-extrabold">Ingresa tu correo y clave.</h1>
                <div className="flex flex-col md:flex-row items-center md:items-start lg:justify-center lg:space-x-10">
                    <div className="bg-gray-200 w-[400px] h-[420px] rounded-lg text-black p-5 my-5 mx-auto md:mx-0 text-center shadow-lg overflow-hidden">
                        <h1 className="p-5 text-3xl font-bold">Iniciar Sesion</h1>
                        <em className="p-3 font-bold text-teal-600">Sistema De Control Vehicular</em>

                        <form onSubmit={handleLogin}
                            className="p-3 bg-gray-200 text-black "
                        >
                            <div className="mb-4">
                                <label className="block text-semibold">Correo:</label>
                                <input type="email"
                                    className="w-full p-2 rounded bg-white text-black"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-semibold">Contraseña:</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full p-2 rounded bg-white text-black pr-10"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <a href="#"><p className="italic hover:text-blue-800">Olvidaste tu contraseña?</p></a>
                            </div>
                            <div className="mb-4">
                                <button className="bg-teal-500 text-white mt-10 px-4 rounded py-2 hover:bg-teal-900 cursor-pointer">Ingresar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login
