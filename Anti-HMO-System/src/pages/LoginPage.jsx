import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                navigate(`/dashboard/${data.role || 'patient'}`);
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to connect to backend server');
        }
    };

    return (
        <>
            <style>
                {`
          .login-container {
            display: flex;
            min-height: calc(100vh - 70px);
          }
          .login-left {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .login-banner {
            display: none;
            flex: 1;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
            color: white;
            padding: 4rem;
            flex-direction: column;
            justify-content: center;
          }
          .form-input {
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            border-radius: 0.5rem;
            border: 1px solid var(--border-color);
            outline: none;
            transition: all 0.2s ease;
            font-size: 0.95rem;
          }
          .form-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
          }
          @media (min-width: 900px) {
            .login-banner {
              display: flex;
            }
          }
        `}
            </style>

            <div className="login-container">
                {/* Left side form */}
                <div className="login-left">
                    <div style={{ width: '100%', maxWidth: '400px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: 'var(--bg-accent)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
                                    <ShieldCheck size={32} />
                                </div>
                            </div>
                            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome Back</h1>
                            <p style={{ color: 'var(--text-light)' }}>Log in to access your secure medical system</p>
                        </div>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address / Provider ID</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', top: '14px', left: '12px', color: 'var(--text-light)' }} />
                                    <input
                                        type="email"
                                        placeholder="doctor@hospital.com"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Password</label>
                                    <a href="#" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 500 }}>Forgot Password?</a>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', top: '14px', left: '12px', color: 'var(--text-light)' }} />
                                    <input
                                        type="password"
                                        placeholder="••••••••••"
                                        className="form-input"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', width: '100%', textAlign: 'center', marginTop: '0.5rem', padding: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                                <ShieldCheck size={20} />
                                Sign in Securely
                            </button>
                        </form>

                        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            Don't have access? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign Up</Link>
                        </p>
                    </div>
                </div>

                {/* Right side banner */}
                <div className="login-banner">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
                        Securing Healthcare<br />With Blockchain & AI
                    </h2>
                    <p style={{ fontSize: '1.125rem', opacity: 0.9, maxWidth: '500px', lineHeight: 1.6 }}>
                        Join the network of providers utilizing immutable ledgers to prevent data tampering and zero-trust AI models to detect fraudulent claims in real-time.
                    </p>
                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', opacity: 0.8 }}>
                        <span style={{ fontSize: '0.875rem', border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>Audit Compliant</span>
                        <span style={{ fontSize: '0.875rem', border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>HMIS Integrated</span>
                    </div>
                </div>
            </div>
        </>
    );
}
