import { useQuery, QueryFunction } from "@tanstack/react-query";


interface Vehiculos {
    id_vehiculo: number;
    id_usuario: number;
    marca: string;
    ubicacion: string;
    Temperatura: string;
    nivel_conbustible: string;
    kilometrage: number;
}

const fetchProducts: QueryFunction<Vehiculos[]> = async () => {
    const response = await fetch("/api/vehiculos.json");

    if (!response.ok) {
        throw new Error("Network response was not ok.");
    }
    return response.json();
}

export const useVehiculos = () => {
    return useQuery<Vehiculos[], Error>({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });
};