import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const navigate = useNavigate();
 
  const handleLogout = () => {
    // Clear the authentication token
    Cookies.remove('token'); 
    window.location.href='/login';
    alert('Logout Successfully');

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const token = Cookies.get('token'); // Retrieve token from cookie
      const response = await fetch('http://localhost:5000/api/lectures/create_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      setMessage('');
    } catch (error) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Send Complaint</h2>
      {success && (
        <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-md">
          Message sent successfully!
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md">
          {error}
        </div>
      )}

 
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          rows="5"
          placeholder="Type your message here..."
          value={message}
          onChange={handleChange}
          disabled={sending}
        ></textarea>
        <button
          type="submit"
          className={`mt-4 w-100 bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none ${
            sending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600 focus:bg-gray-600'
          }`}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
