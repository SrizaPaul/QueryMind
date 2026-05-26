import { useState, useEffect } from 'react';

import axios from 'axios';

import {
  useNavigate,
  Link
} from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: '',
      email: '',
      password: ''

    });

  useEffect(() => {

    const token =
      localStorage.getItem('token');

    if (token) {

      navigate('/dashboard');

    }

  }, [navigate]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSignup = async () => {

    try {

      await axios.post(

        // 'http://localhost:3000/api/auth/register',
        'https://querymind-backend-i5jp.onrender.com/api/auth/register',

        formData

      );

      alert('Account created');

      navigate('/');

    } catch (error) {

      console.error(error);

      alert('Signup failed');

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="bg-gray-900 p-10 rounded-2xl w-[400px] border border-gray-800">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Signup
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-800 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-800 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-800 outline-none"
          />

          <button
            onClick={handleSignup}
            className="w-full bg-green-500 hover:bg-green-600 py-4 rounded-lg font-semibold"
          >
            Create Account
          </button>

          <p className="text-center text-gray-400">

            Already have an account?

            <Link
              to="/"
              className="text-blue-400 ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Signup;