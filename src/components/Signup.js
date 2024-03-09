// Signup.js

import React, { useEffect, useState } from 'react';
import './Signup.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router';
import {  toast } from 'react-toastify';
import axios from 'axios';
import { clearSession } from './utils';

 


const Signup = () => {
    useEffect(() => {
        clearSession();
      }, []);
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating a delay for demo purposes (remove this in a real application)
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            await axios.post("https://merntaskbackend-zzhg.onrender.com/api/user/register",{username:formData.username,email:formData.email,password:formData.password}).then((res)=>{
              console.log(res);
              toast.info(res.data.msg);
              navigate('/signin');
            })
           } catch (error) {
            toast.error(error);
            setIsSubmitting(false);
           }
           setIsSubmitting(false);

    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSignUp}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className={isSubmitting ? "submitting" : ""}>
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default Signup;
