import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Kilometraje: React.FC = () => {
    const kilometraje = 35698; // Valor actual del kilometraje
    const kilometrajeMax = 100000; // Kilometraje máximo para representación visual

    return (
        <div className="rounded-lg text-black p-5 my-5 mx-auto md:mx-0 text-center shadow-lg overflow-hidden">
            <h1 className="p-5 text-3xl text-white font-bold">Kilometraje</h1>
            <div className="w-40 h-40 mx-auto">
                <CircularProgressbar
                    value={kilometraje}
                    maxValue={kilometrajeMax}
                    text={`${kilometraje} km`}
                    styles={buildStyles({
                        textColor: "green",
                        pathColor: "green",
                        trailColor: "#eee",
                    })}
                />
            </div>
            <p className="mt-5 text-white text-xl font-bold">
                Nivel actual de kilometraje.
            </p>
        </div>
    );
};

export default Kilometraje;
