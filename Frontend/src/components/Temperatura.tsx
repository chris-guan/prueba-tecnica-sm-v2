import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Temperatura: React.FC = () => {
    const [alerta, setAlerta] = useState<string | null>(null);
    const [estado, setEstado] = useState<string>(""); // Nuevo estado para el mensaje del estado del vehículo
    const temperatura = 90; // Valor de temperatura actual (puedes reemplazarlo con una variable dinámica)
    const limiteSobrecalentamiento = 90; // Límite para alertas de sobrecalentamiento

    // Determina el estado del vehículo según la temperatura
    useEffect(() => {
        if (temperatura <= 20) {
            setEstado("Frío");
            setAlerta(null);
        } else if (temperatura > 20 && temperatura <= 60) {
            setEstado("Normal");
            setAlerta(null);
        } else if (temperatura > 60 && temperatura < limiteSobrecalentamiento) {
            setEstado("Caliente");
            setAlerta(null);
        } else if (temperatura >= limiteSobrecalentamiento) {
            setEstado("Sobrecalentado");
            setAlerta("¡Cuidado! El vehículo está sobrecalentándose.");
        }
    }, [temperatura]);

    return (
        <div className="rounded-lg text-white p-5 my-5 mx-auto md:mx-0 text-center shadow-lg overflow-hidden">
            <h1 className="p-5 text-3xl font-bold">Temperatura</h1>
            <div className="w-40 h-40 mx-auto">
                <CircularProgressbar
                    value={temperatura}
                    maxValue={120}
                    text={`${temperatura}°`}
                    styles={buildStyles({
                        textColor: temperatura >= limiteSobrecalentamiento ? "red" : "green",
                        pathColor: temperatura >= limiteSobrecalentamiento ? "red" : "green",
                        trailColor: "#eee",
                    })}
                />
            </div>
            {/* Mostrar estado del vehículo */}
            <div className="mt-5 p-3 bg-gray-200 font-bold rounded-lg text-xl text-black">
                Estado del vehículo: {estado}
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

export default Temperatura;
