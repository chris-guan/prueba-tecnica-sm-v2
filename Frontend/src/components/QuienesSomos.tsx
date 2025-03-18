import { useState } from 'react';
import misionImg from '../images/mision.jpg'; // Asegúrate de tener estas imágenes
import visionImg from '../images/vision.jpg';
import equipoImg from '../images/equipo.jpg';

const QuienesSomos: React.FC = () => {
    const [isHovered, setIsHovered] = useState<string | null>(null);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-100 to-white" id="quienes-somos">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
                    Quiénes Somos
                </h2>

                {/* Grid principal */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {/* Imagen corporativa */}
                    <div className="relative overflow-hidden rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
                        <img
                            src={equipoImg}
                            alt="Equipo de trabajo"
                            className="w-full h-[400px] object-cover"
                        />
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
                            Nuestra Historia
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Somos una empresa líder en el monitoreo y control vehicular,
                            comprometidos con la innovación y la excelencia en el servicio.
                            Desde nuestra fundación, nos hemos dedicado a desarrollar
                            soluciones tecnológicas que mejoran la gestión y eficiencia
                            de las flotas vehiculares.
                        </p>
                    </div>
                </div>

                {/* Misión y Visión */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Misión */}
                    <div
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2"
                        onMouseEnter={() => setIsHovered('mision')}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={misionImg}
                                alt="Misión"
                                className={`w-full h-full object-cover transform transition-transform duration-500 ${isHovered === 'mision' ? 'scale-110' : 'scale-100'
                                    }`}
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Misión</h3>
                            <p className="text-gray-600">
                                Proporcionar soluciones innovadoras de monitoreo vehicular
                                que mejoren la eficiencia y seguridad de nuestros clientes,
                                a través de tecnología de vanguardia y un servicio excepcional.
                            </p>
                        </div>
                    </div>

                    {/* Visión */}
                    <div
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2"
                        onMouseEnter={() => setIsHovered('vision')}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={visionImg}
                                alt="Visión"
                                className={`w-full h-full object-cover transform transition-transform duration-500 ${isHovered === 'vision' ? 'scale-110' : 'scale-100'
                                    }`}
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Visión</h3>
                            <p className="text-gray-600">
                                Ser la empresa líder en soluciones de control vehicular,
                                reconocida por nuestra excelencia en innovación, calidad
                                y compromiso con el éxito de nuestros clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuienesSomos;