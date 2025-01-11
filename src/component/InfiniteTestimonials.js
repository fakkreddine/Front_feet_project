import React from "react";
import { motion } from "framer-motion";

const InfiniteTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      title: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=1",
      feedback: "This platform has been a game-changer for my career!",
    },
    {
      id: 2,
      name: "John Smith",
      title: "Product Manager",
      image: "https://i.pravatar.cc/150?img=2",
      feedback: "Highly recommend this to anyone seeking amazing results.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Designer",
      image: "https://i.pravatar.cc/150?img=3",
      feedback: "A wonderful experience from start to finish.",
    },
    {
      id: 4,
      name: "Alex Brown",
      title: "Marketing Specialist",
      image: "https://i.pravatar.cc/150?img=4",
      feedback: "I’m blown away by the quality and attention to detail!",
    },
  ];

  // Duplicate testimonials to create the infinite effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden py-12 bg-gradient-to-r from-blue-800 via-indigo-500 to-blue-800">
      <motion.div
        className="flex space-x-12"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 30, // Adjust for speed
          ease: "linear",
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 bg-white shadow-lg rounded-xl p-8 text-center transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-indigo-500"
            />
            <h3 className="text-2xl font-semibold text-gray-900">{testimonial.name}</h3>
            <p className="text-lg text-indigo-500 mb-4">{testimonial.title}</p>
            <p className="text-gray-700 text-sm">{testimonial.feedback}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteTestimonials;
