import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AddLecturerForm = () => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:5000/api/lectures/add_lecturer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          expertise,
          department: selectedDepartment,
          contact,
          email,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      alert('Lecturer Name added successfully');
      setName('');
      setExpertise('');
      setSelectedDepartment('');
      setContact('');
      setEmail('');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 m-5 container mx-auto max-w-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Lecturer Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          id="name"
          required
        />
      </div>    

      <div className='mb-4'>
      <label htmlFor="selectedDepartment" className="block text-sm font-medium text-gray-700">Lecturer Course</label>
      <select
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200 block w-full"
        id="expertise"
        value={expertise}
        onChange={(e) => setExpertise(e.target.value)}
        required
        >
        <option value="">Select Expertise</option>
        <option value="Algorithms and Data Structures">Algorithms and Data Structures</option>
        <option value="Database Systems">Database Systems</option>
        <option value="Computer Networks">Computer Networks</option>
        <option value="Operating Systems">Operating Systems</option>
        <option value="Machine Learning">Machine Learning</option>
        <option value="Artificial Intelligence">Artificial Intelligence</option>
        <option value="Computer Graphics">Computer Graphics</option>
        <option value="Software Engineering Methodologies">Software Engineering Methodologies</option>
        <option value="Cybersecurity">Cybersecurity</option>
        <option value="Web Development">Web Development</option>
        <option value="Mobile App Development">Mobile App Development</option>
        <option value="Cloud Computing">Cloud Computing</option>
        <option value="Big Data Analytics">Big Data Analytics</option>
    </select>
    </div>


      <div className="mb-4">
        <label htmlFor="selectedDepartment" className="block text-sm font-medium text-gray-700">Lecturer Name Department</label>
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
        Add Lecturer Name
      </button>
    </form>
  );
};

export default AddLecturerForm;
