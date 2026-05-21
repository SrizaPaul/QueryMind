import { useState, useEffect } from 'react';

import axios from 'axios';

import {
  useNavigate,
  Link
} from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

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

  const handleLogin = async () => {

    try {

      const response =
        await axios.post(

          'http://localhost:3000/api/auth/login',

          formData

        );

      localStorage.setItem(
        'token',
        response.data.token
      );

      navigate('/dashboard');

    } catch (error) {

      console.error(error);

      alert('Login failed');

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="bg-gray-900 p-10 rounded-2xl w-[400px] border border-gray-800">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Login
        </h1>

        <div className="space-y-5">

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
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-lg font-semibold"
          >
            Login
          </button>

          <p className="text-center text-gray-400">

            Don't have an account?

            <Link
              to="/signup"
              className="text-blue-400 ml-2"
            >
              Signup
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;