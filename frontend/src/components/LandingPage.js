import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from './hero1.jpeg'; // Import your image

const LandingPage = () => {
  return (
    <div className="bg-green-900 text-white min-h-screen m-0">
      {/* Navigation */}
      <nav className="bg-green-900 p-4 ">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">Hassan Usman Katsina Polytechnic</h1>
          <div>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/register" className="text-white">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-cover bg-center h-screen flex items-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="container mx-auto text-center">
          <h2 className="text-5xl  text-blue font-bold mb-4">Welcome to Hassan Usman Katsina Polytechnic</h2>
          <p className="text-lg text-black mb-8">Your gateway to quality education</p>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-dark font-bold py-2 px-4 rounded">Get Started</Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">About Us</h2>
        <p className="text-lg mb-8">Brief description of the institution...</p>

        {/* Other sections/content */}
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-gray-300 py-4 text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 Hassan Usman Katsina Polytechnic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
