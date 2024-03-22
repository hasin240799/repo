import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ViewCourseMaterials = () => {
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchCourseMaterials = async () => {
    try {
      const token = Cookies.get('token');
      const user_id = Cookies.get('user_id');

      const response = await fetch('http://localhost:5000/api/lectures/get_course_materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch course materials');
      }

      const data = await response.json();
      setCourseMaterials(data ?? []);
    } catch (error) {
      console.error('Error fetching course materials:', error);
    }
  };

  useEffect(() => {
    fetchCourseMaterials();
  }, []);

  const handleDownloadPDF = (filePath, fileName) => {
    const fileUrl = `http://localhost:5000/${filePath}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="container">
      <h3 className="text-xl font-semibold mb-4">Course Materials</h3>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courseMaterials.map((material) => (
            <tr key={material.id}>
              <td className="px-6 py-4 whitespace-nowrap">{material.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{material.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDownloadPDF(material.fileUrl, material.fileName)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCourseMaterials;
