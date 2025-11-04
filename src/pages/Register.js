import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    occupation: '',
    age: '',
    country: '',
    maritalStatus: 'male',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });
  const nav = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (password) => {
    const feedback = [];
    let score = 0;

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One lowercase letter');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One uppercase letter');
    }

    // Number check
    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One number');
    }

    // Special character check
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One special character');
    }

    return { score, feedback };
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setForm({ ...form, password: newPassword });
    
    if (newPassword.length > 0) {
      const strength = checkPasswordStrength(newPassword);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, feedback: [] });
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength.score <= 2) return '#ff4444'; // Weak - Red
    if (passwordStrength.score <= 3) return '#ffaa00'; // Medium - Orange
    if (passwordStrength.score <= 4) return '#00aa00'; // Strong - Green
    return '#008800'; // Very Strong - Dark Green
  };

  const getStrengthText = () => {
    if (passwordStrength.score <= 2) return 'Weak';
    if (passwordStrength.score <= 3) return 'Medium';
    if (passwordStrength.score <= 4) return 'Strong';
    return 'Very Strong';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validate password strength
    if (passwordStrength.score < 3) {
      setError('Please use a stronger password. Your password should include uppercase letters, lowercase letters, numbers, and special characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await API.post('/users/register', form);
      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('tokenChanged'));
      nav('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      
      <input placeholder="Full name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} required />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input placeholder="WhatsApp number" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} required />
      <input placeholder="Occupation" value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })} required />
      <input type="number" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} required min="1" max="120" />
      <input placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required />
      
      <select value={form.maritalStatus} onChange={e => setForm({ ...form, maritalStatus: e.target.value })} required>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      
      <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
      
      <div className="password-field">
        <input 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handlePasswordChange} 
          required 
        />
        {form.password && (
          <div className="password-strength">
            <div className="strength-bar">
              <div 
                className="strength-fill"
                style={{
                  width: `${(passwordStrength.score / 5) * 100}%`,
                  backgroundColor: getStrengthColor()
                }}
              ></div>
            </div>
            <div className="strength-info">
              <span>Strength: </span>
              <span style={{ color: getStrengthColor(), fontWeight: 'bold' }}>
                {getStrengthText()}
              </span>
            </div>
            {passwordStrength.feedback.length > 0 && (
              <div className="password-requirements">
                <p>Password must contain:</p>
                <ul>
                  {passwordStrength.feedback.map((requirement, index) => (
                    <li key={index} className="requirement-item">{requirement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      <input 
        type="password" 
        placeholder="Confirm password" 
        value={form.confirmPassword} 
        onChange={e => setForm({ ...form, confirmPassword: e.target.value })} 
        required 
      />
      
      <button 
        type="submit" 
        disabled={passwordStrength.score < 3}
        className={passwordStrength.score < 3 ? 'disabled' : ''}
      >
        Register
      </button>
      
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
  }
