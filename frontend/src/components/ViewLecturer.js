import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ViewLectures = () => {
  // State to store the list of lectures
  const [lectures, setLectures] = useState([]);

  // Function to fetch lectures from the backend
  const fetchLectures = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:5000/api/lectures/get_lecturers', {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in request headers
        },
      });

      const data = await response.json();
      setLectures(data.lecturer); // Assuming the lectures are returned as an array from the backend
      console.log(data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  // useEffect hook to fetch lectures when the component mounts
  useEffect(() => {
    fetchLectures();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:5000/api/lectures/delete_lecture/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Update the lectures list after successful deletion
        fetchLectures();
      } else {
        console.error('Error deleting lecture:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  return (
    <div className="container">
      <h3 className="text-xl font-semibold mb-4"> Lecturers</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecture ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecturer Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lectures.map((lecture) => (
            <tr key={lecture.lecture_id}>
              <td className="px-6 py-4 whitespace-nowrap">{lecture.lecturer_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lecture.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lecture.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lecture.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lecture.expertise}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lecture.department}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLectures;
