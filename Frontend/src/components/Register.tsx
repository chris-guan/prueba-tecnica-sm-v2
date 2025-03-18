import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Image3 from "../images/register.jpg"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        email: '',
        password: '',
        confirmPass: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validaciones del lado del cliente
    const validateForm = () => {
        if (formData.password.length < 8) {
            setMensaje('La contraseña debe tener al menos 8 caracteres');
            return false;
        }
        if (formData.password !== formData.confirmPass) {
            setMensaje('Las contraseñas no coinciden');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setMensaje('Email inválido');
            return false;
        }
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: formData.nombre_usuario,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setMensaje(data.message);
            }
        } catch (err) {
            setMensaje('Error en el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="p-5 min-h-screen bg-cover bg-center from-black via-gray-800 to-black" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.81), rgba(20, 34, 9, 0.29)), url(${Image3})` }}>

                <div className="flex-col justify-center items-center text-center min-h-screen">

                    <h1 className="p-5 mt-10 text-3xl text-white text-center font-extrabold">Registrate a {''} <span className="text-green-500">Sistema de Control Vehicular</span> con tu nombre y correo electronico.</h1>
                    <div className="flex flex-col items-center md:items-center lg:justify-center lg:space-x-10">
                        <div className="bg-gray-200 w-[400px] h-[600px] rounded-lg text-black p-5 my-5 mx-auto md:mx-0 text-center shadow-lg overflow-hidden">
                            <h1 className="p-5 text-3xl font-bold">Crear Cuenta</h1>
                            <form
                                className="bg-gray-200 text-black"
                                onSubmit={handleRegister}
                            >
                                <div className="mb-4">
                                    <label className="block text-semibold">Nombre:</label>
                                    <input type="text"
                                        className="w-full p-2 rounded bg-white text-black"
                                        name="nombre_usuario"
                                        value={formData.nombre_usuario}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-semibold">Correo:</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 rounded bg-white text-black"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-semibold">Contraseña:</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="w-full p-2 rounded bg-white text-black pr-10"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
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
                                <div className="mb-4">
                                    <label className="block text-semibold">Confirmar Contraseña:</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="w-full p-2 rounded bg-white text-black pr-10"
                                            name="confirmPass"
                                            value={formData.confirmPass}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <button type="submit"
                                        className="bg-teal-500 text-white mt-10 px-4 rounded py-2 hover:bg-teal-900 cursor-pointer"
                                        disabled={loading}>Crear Usuario
                                    </button>
                                    <div className="my-5">
                                        ¿Ya estas registrado? <a className="text-teal-700" href="#login"><Link to="/login">Inicia Sesión</Link></a>
                                    </div>
                                    {mensaje && <p className="text-teal-700">{mensaje}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register
