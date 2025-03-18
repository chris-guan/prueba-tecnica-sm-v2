import React from 'react';

const Ubicacion: React.FC = () => {
    return (
        <div className="rounded-lg text-white p-5 my-5 mx-auto text-center shadow-lg overflow-hidden">

            <h1 className="p-5 text-2xl sm:text-3xl lg:text-4xl font-bold">Ubicación</h1>
            <div className="p-3 grid grid-cols-1 gap-5 md:grid-cols-2 rounded-2xl items-center justify-center font-bold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700">

                <iframe
                    className="w-full h-[200px] sm:h-[300px] lg:h-[400px] rounded-lg shadow-md"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d497.10322911913534!2d-74.0892803!3d4.6251428!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9962d2f8911f%3A0x1eae62ab311e1b1b!2sCra.%2032c%20%2323-2%20a%2023-40%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1742185793393!5m2!1ses!2sco"
                    loading="lazy"
                ></iframe>
                <p className="p-5 text-lg sm:text-xl lg:text-2xl text-white font-bold">
                    Aquí puedes rastrear en tiempo real tu vehículo.
                </p>
            </div>
        </div>
    );
};

export default Ubicacion;
