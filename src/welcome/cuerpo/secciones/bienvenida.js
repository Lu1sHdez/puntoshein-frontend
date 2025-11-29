import React from "react";
import { useNavigate } from "react-router-dom";
import useSesionUsuario from "../../../context/useSesionUsuario";

// Importa carrusel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Bienvenida = () => {
  const navigate = useNavigate();
  const { usuarioAutenticado, datos } = useSesionUsuario();

  return (
    <section className="relative isolate overflow-hidden bg-white py-10 sm:py-16">

      {/* Fondo difuminado superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem]
                     -translate-x-1/2 rotate-[30deg]
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-25
                     sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 animate-fade-in-up">

        {/* ----- CARRUSEL COMPLETO ----- */}
        <div className="rounded-2xl overflow-hidden shadow-lg relative">

          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
            transitionTime={800}
            swipeable={true}
            emulateTouch={true}
            className="rounded-2xl overflow-hidden"
          >
            {/* IMAGEN 1 */}
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738378032/pshein_dsluvs.jpg"
                alt="Bienvenida"
                className="h-56 sm:h-80 md:h-96 w-full object-cover"
              />
            </div>

            {/* IMAGEN 2 */}
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738384760/pshein1_dssmlw.avif"
                alt="Moda"
                className="h-56 sm:h-80 md:h-96 w-full object-cover"
              />
            </div>

            {/* IMAGEN 3 */}
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295506/moda1_qwtxdu.png"
                alt="Colecciones"
                className="h-56 sm:h-80 md:h-96 w-full object-cover"
              />
            </div>
          </Carousel>

          {/* ----- CONTENIDO FIJO SOBRE EL CARRUSEL (NO SE MUEVE) ----- */}
          <div
            className="
              absolute inset-0 
              bg-gradient-to-t from-black/70 to-transparent
              flex flex-col items-center justify-end
              px-6 pb-6 sm:pb-10
              text-center
            "
          >
            <h1
              className="
                font-bold tracking-tight drop-shadow-lg 
                text-white
                text-2xl sm:text-3xl md:text-4xl 
                mb-3
              "
            >
              Bienvenido
              {usuarioAutenticado && datos?.nombre ? `, ${datos.nombre}` : ""} a{" "}
              <span className="text-blue-700">Punto Shein</span>
            </h1>

            <p
              className="
                text-white font-medium drop-shadow-lg
                text-sm sm:text-base md:text-lg
                max-w-xl mb-4
              "
            >
              Explora nuestras colecciones, descubre promociones y gestiona tu inventario fácilmente.
            </p>

            {/* BOTONES */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">

              <button
                onClick={() => navigate("/cuerpo")}
                className="
                  px-5 py-2 sm:px-6 sm:py-3 
                  bg-white text-gray-900 
                  font-semibold rounded-lg shadow 
                  hover:scale-105 transition
                  text-sm sm:text-base
                "
              >
                Ver productos
              </button>

              {!usuarioAutenticado ? (
                <button
                  onClick={() => navigate("/login")}
                  className="
                    px-5 py-2 sm:px-6 sm:py-3 
                    bg-blue-600 text-white 
                    font-semibold rounded-lg shadow 
                    hover:bg-blue-500 hover:scale-105 transition
                    text-sm sm:text-base
                  "
                >
                  Iniciar sesión
                </button>
              ) : (
                <button
                  onClick={() => navigate("/usuario/perfil")}
                  className="
                    px-5 py-2 sm:px-6 sm:py-3 
                    bg-blue-600 text-white 
                    font-semibold rounded-lg shadow 
                    hover:bg-blue-500 hover:scale-105 transition
                    text-sm sm:text-base
                  "
                >
                  Ver perfil
                </button>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Fondo difuminado inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem]
                     -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-blue-700 opacity-25
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

export default Bienvenida;
