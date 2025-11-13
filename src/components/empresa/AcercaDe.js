import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { dataLoadingAnimation } from "../Funciones";
import { API_URL } from "../../ApiConexion";
import CargandoBarra from "../../Animations/CargandoBarra";

const AcercaDe = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/empresa/empresa`, {
          withCredentials: true,
        });
        setEmpresa(response.data);
      } catch (error) {
        setError(
          "No se pudo cargar la información de la empresa. Por favor, intenta más tarde."
        );
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresa();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <CargandoBarra message="Cargando la información..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-base font-semibold py-10">
        {error}
      </div>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
      {/* Fondo difuminado superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem]
                     -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr
                     from-blue-400 to-blue-700 opacity-20
                     sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      {/* Contenedor principal */}
      <motion.div
        {...dataLoadingAnimation}
        className="max-w-5xl mx-auto px-6 sm:px-10 py-10 bg-white border border-gray-200 rounded-2xl shadow-lg"
      >
        {/* Encabezado */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-3">
            Acerca de Nosotros
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Conoce más sobre quiénes somos y lo que nos inspira
          </p>
        </header>

        {/* Contenido estilo "tarjetas" igual que Política de Privacidad */}
        <div className="space-y-10 animate-fade-in-up text-gray-700 leading-relaxed">

          {/* Misión */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 border border-gray-100 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Misión</h2>
            <p className="text-justify">{empresa.mision}</p>
          </motion.div>

          {/* Visión */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-5 border border-gray-100 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Visión</h2>
            <p className="text-justify">{empresa.vision}</p>
          </motion.div>

          {/* Valores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-5 border border-gray-100 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Valores</h2>
            {empresa.valores?.length > 0 ? (
              <ul className="list-disc pl-6 space-y-2">
                {empresa.valores.map((valor, index) => (
                  <li key={index}>
                    <strong className="text-blue-600">{valor.nombre}:</strong>{" "}
                    {valor.descripcion}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay valores definidos.</p>
            )}
          </motion.div>

          {/* Historia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="p-5 border border-gray-100 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Historia</h2>
            <p className="text-justify">{empresa.historia}</p>
          </motion.div>

          {/* Equipo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="p-5 border border-gray-100 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Nuestro Equipo</h2>
            <p className="text-justify">{empresa.equipo}</p>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="p-5 border border-blue-200 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Contacto</h2>
            <p><strong>Correo:</strong> {empresa.correo}</p>
            <p><strong>Teléfono:</strong> {empresa.telefono}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Fondo inferior difuminado */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem]
                     -translate-x-1/2 bg-gradient-to-tr from-blue-400
                     to-blue-700 opacity-20
                     sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
};

export default AcercaDe;
