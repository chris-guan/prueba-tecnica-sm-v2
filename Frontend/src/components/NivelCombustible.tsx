import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const NivelCombustible: React.FC = () => {
    const [alerta, setAlerta] = useState<string | null>(null);
    const [estado, setEstado] = useState<string>("");
    const gasolina = 10;
    const limiteGasolinaBaja = 10;
    const limiteGasolinaMedia = 50;


    useEffect(() => {
        if (gasolina <= 20 && gasolina < limiteGasolinaBaja) {
            setEstado("Nivel Bajo, Llenar Tanque");
            setAlerta(null);
        } else if (gasolina > 20 && gasolina < limiteGasolinaMedia) {
            setEstado("Normal");
            setAlerta(null);
        } else if (gasolina > limiteGasolinaMedia) {
            setEstado("Sobresaliente");
            setAlerta(null);
        } else if (gasolina <= limiteGasolinaBaja) {
            setEstado("No Hay Gasolina");
            setAlerta("¡Atención! El Vehiculo no tiene Gasolina.");

        }
    }, [gasolina]);

    return (
        <div className="rounded-lg text-white p-5 my-5 mx-auto md:mx-0 text-center shadow-lg overflow-hidden">
            <h1 className="p-5 text-3xl font-bold">Nivel de Combustible</h1>
            <div className="w-40 h-40 mx-auto">
                <CircularProgressbar
                    value={gasolina}
                    maxValue={100}
                    text={`${gasolina}%`}
                    styles={buildStyles({
                        textColor: gasolina > limiteGasolinaMedia ? "green" : gasolina > limiteGasolinaBaja ? "#fbbf24" : "red",
                        pathColor: gasolina > limiteGasolinaMedia ? "green" : gasolina > limiteGasolinaBaja ? "#fbbf24" : "red",
                        trailColor: "#eee",
                    })}
                />
            </div>
            {/* Mostrar estado del vehículo */}
            <div className="mt-5 p-3 bg-gray-200 font-bold rounded-lg text-xl text-black">
                Estado del Tanque: {estado}
            </div>
            {/* Mostrar alerta si es necesario */}
            {alerta && (
                <div className="mt-5 p-3 bg-red-500 text-white font-bold rounded-lg">
                    {alerta}
                </div>
            )}
        </div>
    );
};

export default NivelCombustible;