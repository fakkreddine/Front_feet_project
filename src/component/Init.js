import React from 'react'

function Init() {
  return (
    <div>
    {/* Navbar */}
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">SchoolSystem</h1>
        <ul className="flex space-x-8">
          <li><a href="#features" className="hover:text-yellow-300">Features</a></li>
          <li><a href="#about" className="hover:text-yellow-300">About</a></li>
          <li><a href="#contact" className="hover:text-yellow-300">Contact</a></li>
        </ul>
      </div>
    </nav>

    {/* Hero Section with Flobite Block */}
    <section className="bg-blue-700 text-white py-20" id="hero">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-4">Welcome to SchoolSystem</h2>
        <p className="text-xl mb-8">A modern school management system to manage students, teachers, and classes with ease.</p>
        <a href="#register" className="bg-yellow-500 text-white py-2 px-6 rounded-full text-lg hover:bg-yellow-400 transition duration-300">Get Started</a>
      </div>
    </section>

    {/* Features Section using Flobite Block */}
    <section id="features" className="py-20">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
        <div className="flobite-block grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="flobite-block-item p-6 border rounded-lg shadow-md">
            <div className="flobite-icon flobite-icon-schools mb-4 text-yellow-500 text-4xl"></div>
            <h4 className="text-xl font-semibold mb-2">Student Management</h4>
            <p>Manage student records, grades, and attendance all in one platform.</p>
          </div>
          <div className="flobite-block-item p-6 border rounded-lg shadow-md">
            <div className="flobite-icon flobite-icon-teacher mb-4 text-yellow-500 text-4xl"></div>
            <h4 className="text-xl font-semibold mb-2">Teacher Dashboard</h4>
            <p>Empower teachers with tools to manage assignments, grades, and more.</p>
          </div>
          <div className="flobite-block-item p-6 border rounded-lg shadow-md">
            <div className="flobite-icon flobite-icon-calendar mb-4 text-yellow-500 text-4xl"></div>
            <h4 className="text-xl font-semibold mb-2">Class Scheduling</h4>
            <p>Easily schedule classes, exams, and track important events.</p>
          </div>
        </div>
      </div>
    </section>

    {/* About Section with Flobite Block */}
    <section id="about" className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">About SchoolSystem</h3>
        <p className="text-lg leading-relaxed mb-8">
          SchoolSystem is designed to make education management easier for students, teachers, and administrators. Our platform combines powerful features with a simple interface to improve classroom experiences.
        </p>
        <a href="#register" className="bg-blue-600 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-500 transition duration-300">Register Now</a>
      </div>
    </section>

    {/* Testimonials Section with Flobite Block */}
    <section className="py-20 bg-blue-50" id="testimonials">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">What Our Users Say</h3>
        <div className="flobite-block grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="flobite-block-item p-6 bg-white border rounded-lg shadow-md">
            <div className="flobite-icon flobite-icon-user text-yellow-500 text-4xl mb-4"></div>
            <p className="text-lg">“SchoolSystem has helped us streamline our classroom activities and communication. It's a game-changer for teachers and students alike!”</p>
            <span className="font-semibold">John Doe</span>
            <p className="text-gray-500">Teacher</p>
          </div>
          <div className="flobite-block-item p-6 bg-white border rounded-lg shadow-md">
            <div className="flobite-icon flobite-icon-user text-yellow-500 text-4xl mb-4"></div>
            <p className="text-lg">“I love how easy it is to manage my assignments and grades. The interface is clean and intuitive!”</p>
            <span className="font-semibold">Jane Smith</span>
            <p className="text-gray-500">Student</p>
          </div>
          <div className="flobite-block-item p-6 bg-white border rounded-lg shadow-md">
            <div className="flobite-icon flobite-icon-user text-yellow-500 text-4xl mb-4"></div>
            <p className="text-lg">“As an administrator, SchoolSystem has saved me hours of work every week. The scheduling features are incredibly useful.”</p>
            <span className="font-semibold">Emily Johnson</span>
            <p className="text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="py-20">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Contact Us</h3>
        <p className="text-lg mb-6">Have any questions or need support? We’re here to help you!</p>
        <a
          href="mailto:support@schoolsystem.com"
          className="bg-yellow-500 text-white py-2 px-6 rounded-full text-lg hover:bg-yellow-400 transition duration-300"
        >
          Email Us
        </a>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-blue-600 text-white py-6 text-center">
      <p>&copy; 2025 SchoolSystem. All rights reserved.</p>
    </footer>
  </div>
  )
}

export default Init