

const Contacto: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-100" id="contacto">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
                    Contáctanos
                </h2>

                <form className="bg-gray-800 p-6 rounded-lg">
                    <div className="mb-4">
                        <label className="block text-teal-300 font-extrabold">Nombre</label>
                        <input type="text" className="w-full p-2 rounded bg-gray-500 text-white" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-teal-300 font-extrabold">Correo</label>
                        <input type="email" className="w-full p-2 rounded bg-gray-500 text-white" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-teal-300 font-extrabold">Mensaje</label>
                        <textarea className="w-full p-2 rounded bg-gray-500 text-white"></textarea>
                    </div>
                    <button className="bg-teal-500 px-4 py-2 rounded text-white hover:bg-teal-800 cursor-pointer">Enviar</button>
                </form>
            </div>
        </section>
    );
};

export default Contacto;