import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../features/auth/authSlice';
import './Signin.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import axios from 'axios';
import { clearSession } from './utils';

const Signin = () => {
  useEffect(() => {
    clearSession();
  }, []);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn =async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

        // Simulating a delay for demo purposes (remove this in a real application)
        await new Promise(resolve => setTimeout(resolve, 1000));
try {
  await axios.post("http://localhost:5000/api/user/login", {email:formData.email,password:formData.password})
  .then((response) => {
      sessionStorage.setItem("id", response.data._id);
      if (response.data._id) {
        dispatch(signIn());
      toast.success("Signin Successfull")
      navigate('/')
      }else{
        toast.error(response.data.msg)
        setIsSubmitting(false);
      }
      
  });
} catch (error) {
  toast.error(error);
  setIsSubmitting(false);
}
   
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="signin-form" onSubmit={handleSignIn}>
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
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Signin;