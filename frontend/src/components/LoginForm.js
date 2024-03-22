import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import logo from './logo.jpeg'; // Import your logo image

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
     
      if (response.ok) {
        // If login is successful, get JWT token from response
        const { token,role,username,user_id } = await response.json();
        // Save token in a cookie
        Cookies.set('token', token, { expires: 1 }); // Expires in 1 day
        Cookies.set('role', role, { expires: 10 }); // Expires in 1 day
        Cookies.set('username', username, { expires: 10 }); // Expires in 1 day
        Cookies.set('user_id', user_id, { expires: 10 }); // Expires in 1 day
       
        window.location.href = '/timetable';
      } else {
        // Handle invalid credentials
        console.error('Login failed');
      };

    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="container mx-auto">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
      <img src={logo} alt="Logo" className="mx-auto mb-4" /> {/* Logo */}
      
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address/Username</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
        </div>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Login</button>
        <div className='row mt-2'>
          <div className='col container-sm flex-column items-center'>
                <div className='mx-auto'>
                  <a href='http://localhost:3000/register'>Click here to register..</a>
                </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
