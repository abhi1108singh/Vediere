import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>
                    <ShieldCheck size={28} />
                    <span>Vediere</span>
                </Link>

                <div className="nav-links">
                    <a href="/#">Solutions</a>
                    <a href="/#how-it-works">How System Works</a>
                    <a href="/#use-cases">Use Cases</a>
                    <a href="/#resources">Resources</a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/login" style={{ fontWeight: 600 }}>Login</Link>
                    <Link to="/signup" className="btn-outline">Sign Up</Link>
                    <Link to="/dashboard" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Activity size={18} />
                        Dashboard
                    </Link>
                </div>
            </div>
        </nav>
    );
}
