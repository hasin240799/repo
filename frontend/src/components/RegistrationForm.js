import React, { useState } from 'react';
import Cookies from 'js-cookie';
import logo from './logo.jpeg'; // Import your logo image


const AddStudentForm = () => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [reg, setReg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:5000/api/lectures/add_student/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          reg,
          level,
          department: selectedDepartment,
          contact,
          email,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      alert('Student added successfully');
      setName('');
      setLevel('');
      setSelectedDepartment('');
      setContact('');
      setEmail('');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student');
    }
  };

  return (
    <div className="container mx-auto">
    <h2 className="text-2xl font-bold mb-4">Student Register Form</h2>
    <img src={logo} alt="Logo" className="mx-auto mb-4" /> {/* Logo */}

    <form onSubmit={handleSubmit} className="mt-3 m-5 container mx-auto max-w-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          id="name"
          required
        />
      </div>    

      <div className="mb-4">
        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Select Course Level</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200 block w-full"
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        >
          <option value="">Select Course Level</option>
          <option value="100L">100 Level</option>
          <option value="200L">200 Level</option>
          <option value="300L">300 Level</option>
          <option value="400L">400 Level</option>
          <option value="500L">500 Level</option>
        </select>
      </div>

      <div className="mb-4">
  <label htmlFor="selectedDepartment" className="block text-sm font-medium text-gray-700">Student Department</label>
  <select
    id="selectedDepartment"
    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200 block w-full"
    value={selectedDepartment}
    onChange={(e) => setSelectedDepartment(e.target.value)}
    required
  >
    <option value="">Select a department</option>

    {/* Science Courses */}
    <option value="Agricultural Technology">Agricultural Technology</option>
    <option value="Animal Health and Production Technology">Animal Health and Production Technology</option>
    <option value="Biomedical Engineering Technology">Biomedical Engineering Technology</option>
    <option value="Community Health">Community Health</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Crop Production Technology">Crop Production Technology</option>
    <option value="Dental Nursing">Dental Nursing</option>
    <option value="Dental Technology">Dental Technology</option>
    <option value="Dental Therapy">Dental Therapy</option>
    {/* Add other science courses here */}

    {/* Engineering/Environmental Courses */}
    <option value="Agricultural and Bio-Environmental Engineering/Technology">Agricultural and Bio-Environmental Engineering/Technology</option>
    <option value="Agricultural Engineering/Technology">Agricultural Engineering/Technology</option>
    <option value="Aircraft Engineering Technology">Aircraft Engineering Technology</option>
    <option value="Aircraft Maintenance Engineering">Aircraft Maintenance Engineering</option>
    <option value="Architectural Technology">Architectural Technology</option>
    <option value="Arts and Design">Arts and Design</option>
    <option value="Arts and Industrial Design">Arts and Industrial Design</option>
    {/* Add other engineering/environmental courses here */}

    {/* Management Courses, Arts, and Social Science Courses */}
    <option value="Accountancy">Accountancy</option>
    <option value="Anthropology">Anthropology</option>
    <option value="Arabic and Islamic Studies">Arabic and Islamic Studies</option>
    <option value="Arabic Language">Arabic Language</option>
    <option value="Arabic Language and Literature">Arabic Language and Literature</option>
    <option value="Arabic Studies">Arabic Studies</option>
    <option value="Archaeology">Archaeology</option>
    <option value="Art">Art</option>
    <option value="Banking and Finance">Banking and Finance</option>
    <option value="Business Administration and Management">Business Administration and Management</option>
    <option value="Chinese">Chinese</option>
    <option value="Christian Religious Knowledge/Studies">Christian Religious Knowledge/Studies</option>
    {/* Add other management, arts, and social science courses here */}
  </select>
</div>


      <div className="mb-4">
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          id="contact"
          required
        />
      </div>
      
      
      <div className="mb-4">
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Registration No.</label>
        <input
          type="text"
          value={reg}
          onChange={(e) => setReg(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          id="reg"
          required
        />
      </div>
      

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          id="email"
          required
        />
      </div>
      
      <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        Register
      </button>
      <div className='row mt-2'>
          <div className='col container-sm flex-column items-center'>
                <div className='mx-auto'>
                  <a className='text-blue' href='http://localhost:3000/login'>Already Registered click here to Login</a>
                </div>
          </div>
      </div>
    </form>
    </div>
  );
};

export default AddStudentForm;
