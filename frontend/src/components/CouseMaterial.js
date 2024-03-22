import React, { useState } from 'react';
import Cookies from 'js-cookie';

const CreateCourseMaterial = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');
      const userId = Cookies.get('user_id');
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('userId', userId);
      formData.append('file', file);
      formData.append('department', department);

      const response = await fetch('http://localhost:5000/api/lectures/create_material', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload course material');
      }

      setSuccessMessage('Course material uploaded successfully');
      setTimeout(() => setSuccessMessage(''), 2000);

      setTitle('');
      setDescription('');
      setFile(null);
      setDepartment('');

      console.log('Course material uploaded successfully');
    } catch (error) {
      console.error('Error uploading course material:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8">Upload Course Material</h1>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto" encType="multipart/form-data">

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Student Department</label>
          <select
            id="department"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
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
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Course Material (PDF, Docx, etc.)</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseMaterial;
