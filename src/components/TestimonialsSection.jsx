import React from "react";
import { Star } from "lucide-react";

const TestimonialCard = ({ name, position, company, quote, rating, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-4">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white text-lg font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alejandra Gómez",
      position: "Gerente de Logística",
      company: "Tech Solutions",
      quote:
        "ExpressShip ha transformado nuestra cadena de suministro. La puntualidad y la capacidad de seguimiento en tiempo real nos permiten ofrecer un mejor servicio a nuestros clientes.",
      rating: 5,
    },
    {
      name: "Carlos Mendoza",
      position: "Dueño",
      company: "Tienda Online MiModa",
      quote:
        "Desde que utilizamos ExpressShip, las quejas por retrasos en las entregas se redujeron en un 95%. Nuestros clientes están encantados con la rapidez del servicio.",
      rating: 5,
    },
    {
      name: "Laura Jiménez",
      position: "Directora de Operaciones",
      company: "Grupo Industrial Norte",
      quote:
        "La solución empresarial de ExpressShip nos ha permitido optimizar costos y tiempos de entrega. El equipo de soporte siempre está disponible cuando lo necesitamos.",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Miles de empresas y particulares confían en nuestros servicios para
            sus envíos diarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              position={testimonial.position}
              company={testimonial.company}
              quote={testimonial.quote}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-6 py-3 rounded-lg">
            <div className="font-bold text-2xl mr-3">4.8</div>
            <div>
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? "text-yellow-400 fill-current" : "text-yellow-400"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm">Basado en más de 10,000 reseñas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
