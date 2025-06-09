import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { StyledLogin } from '../styles/Login.styles';
import Navbar from '../components/Navbar';
import { userService } from '../services/userService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(formData);
      localStorage.setItem('token', response.accessToken);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <StyledLogin>
        <div className="wrapper">
          <div className="card-switch">
            <label className="switch">
              <input 
                type="checkbox" 
                className="toggle"
                onChange={(e) => {
                  if (e.target.checked) {
                    navigate('/signup');
                  }
                }}
              />
              <span className="slider" />
              <span className="card-side" />
              <div className="flip-card__inner">
                <div className="flip-card__front">
                  <div className="title">Log in</div>
                  {error && <div className="error-message" style={{color: 'red', margin: '10px 0'}}>{error}</div>}
                  <form className="flip-card__form" onSubmit={handleSubmit}>
                    <input 
                      className="flip-card__input" 
                      name="email" 
                      placeholder="Email" 
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                    <input 
                      className="flip-card__input" 
                      name="password" 
                      placeholder="Password" 
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required 
                    />
                    <button type="submit" className="flip-card__btn">Let's go!</button>
                  </form>
                  <div className="social-login">
                    <button className="social-btn google">
                      <GoogleIcon /> Continue with Google
                    </button>
                    <button className="social-btn github">
                      <GitHubIcon /> Continue with GitHub
                    </button>
                  </div>
                </div>
              </div>
            </label>
          </div>   
        </div>
      </StyledLogin>
    </>
  );
};

export default Login;