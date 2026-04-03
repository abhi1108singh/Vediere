import React, { useState } from 'react';
import { ShieldCheck, User, Building, HeartPulse, Stethoscope, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const [selectedRole, setSelectedRole] = useState('doctor');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const roles = [
        { id: 'doctor', name: 'Doctors', icon: <Stethoscope size={24} /> },
        { id: 'hospital', name: 'Hospitals', icon: <Building size={24} /> },
        { id: 'insurance', name: 'Insurance', icon: <HeartPulse size={24} /> },
        { id: 'patient', name: 'Patients', icon: <User size={24} /> },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://vediere.vercel.app//api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role: selectedRole })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                // Redirect user based on their specific dashboard
                navigate(`/dashboard/${selectedRole}`);
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('API Error:', err);
            alert('Failed to connect to backend server');
        }
    };

    return (
        <>
            <style>
                {`
          .signup-container {
            display: flex;
            min-height: calc(100vh - 70px);
            background: var(--bg-accent);
          }
          .signup-content {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 3rem 1.5rem;
            display: flex;
            gap: 4rem;
          }
          .role-card {
            border: 2px solid var(--border-color);
            background: white;
            border-radius: 0.75rem;
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .role-card.active {
            border-color: var(--primary);
            background: #ecfdf5;
            color: var(--primary-dark);
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
          .architecture-flow {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-sm);
          }
          .flow-layer {
            border: 1px solid var(--primary);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
            text-align: center;
            position: relative;
            background: #f8fafc;
          }
          .flow-layer::after {
            content: '▼';
            position: absolute;
            bottom: -18px;
            left: 50%;
            transform: translateX(-50%);
            color: var(--primary);
            font-size: 0.75rem;
          }
          .flow-layer:last-child::after {
            display: none;
          }
        `}
            </style>

            <div className="signup-container">
                <div className="signup-content" style={{ flexWrap: 'wrap' }}>

                    {/* Left Side: Form */}
                    <div style={{ flex: '1 1 400px' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create Account</h1>
                            <p style={{ color: 'var(--text-light)' }}>Join the Tamper-Proof Healthcare Network</p>
                        </div>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>1. Select Your Role</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {roles.map(role => (
                                        <div
                                            key={role.id}
                                            className={"role-card " + (selectedRole === role.id ? "active" : "")}
                                            onClick={() => setSelectedRole(role.id)}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                                {role.icon}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{role.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Full Name / Organization</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', top: '14px', left: '12px', color: 'var(--text-light)' }} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', top: '14px', left: '12px', color: 'var(--text-light)' }} />
                                    <input
                                        type="email"
                                        placeholder="email@address.com"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Secure Password</label>
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

                            <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem', padding: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', border: 'none', cursor: 'pointer' }}>
                                <ShieldCheck size={20} />
                                Register Identity
                            </button>
                        </form>

                        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link>
                        </p>
                    </div>

                    {/* Right Side: Architecture Flow Visual */}
                    <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Your System Security Flow</h3>
                        <div className="architecture-flow">

                            <div className="flow-layer" style={{ background: '#dcfce7', borderColor: 'var(--primary-dark)' }}>
                                <strong>User Interface</strong><br />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Web App ({roles.find(r => r.id === selectedRole).name} Access)</span>
                            </div>

                            <div className="flow-layer">
                                <strong>Application Layer</strong>
                                <ul style={{ fontSize: '0.8rem', textAlign: 'left', marginTop: '0.5rem', listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-light)' }}>
                                    <li>Patient Record Management</li>
                                    <li>Insurance Claim Processing</li>
                                    <li>Fraud Detection Engine (AI)</li>
                                    <li>Self-Audit Monitoring</li>
                                    <li>Auth & Access Control</li>
                                </ul>
                            </div>

                            <div className="flow-layer">
                                <strong>Security Layer</strong><br />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Encryption | Digital Sigs | Logs</span>
                            </div>

                            <div className="flow-layer" style={{ background: '#f1f5f9', borderColor: '#475569' }}>
                                <strong>Tamper-Proof Storage</strong><br />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Blockchain Immutable Ledger</span>
                            </div>

                            <div className="flow-layer" style={{ background: '#f1f5f9', borderColor: '#475569' }}>
                                <strong>Database Layer</strong><br />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Encrypted Patient Data & Claims</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
