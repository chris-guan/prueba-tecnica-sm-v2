import React from "react";
import ImageMaz from "../images/ImageMaz1.jpg";
import ImageMaz2 from "../images/ImageMaz2.jpg";

const Marca: React.FC = () => {
    return (
        <>
            <h1 className="p-7 text-4xl font-bold text-white text-center">Marca</h1>
            <div className="flex flex-wrap justify-center items-center gap-10 p-5 rounded-lg bg-black shadow-lg">
                {/* Imagen 1 */}
                <img
                    src={ImageMaz}
                    className="w-[300px] lg:w-[400px] rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110"
                />
                {/* Imagen 2 */}
                <img
                    src={ImageMaz2}
                    className="w-[300px] h-[300px] lg:w-[400px] rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110"
                />
                {/* Contenedor de datos */}
                <div className="flex flex-col justify-center items-center w-full lg:w-auto text-center">
                    <p className="p-3 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700 border-2 border-white rounded-2xl text-2xl lg:text-4xl font-bold text-white">
                        Mazda 3
                    </p>
                    <br />
                    <p className="p-3 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700 border-2 border-white rounded-2xl text-2xl lg:text-4xl font-bold text-white">
                        Modelo: 2025
                    </p>
                </div>
            </div>
        </>
    );
};

export default Marca;

