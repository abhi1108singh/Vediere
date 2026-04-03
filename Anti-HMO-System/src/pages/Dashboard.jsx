import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Users, UserCog, FileText, AlertTriangle,
    Database, BarChart3, Settings, Search, Bell, LogOut, Download, Plus, CheckCircle, Shield, Sliders, XCircle
} from 'lucide-react';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [claims, setClaims] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal States
    const [showDoctorModal, setShowDoctorModal] = useState(false);
    const [showPatientModal, setShowPatientModal] = useState(false);

    // Initial Mock Data
    const [doctors, setDoctors] = useState([
        { id: 'D-101', name: 'Dr. John Smith', spec: 'Cardiology', patients: 14, claims: 12, performance: '98%' },
        { id: 'D-102', name: 'Dr. Sarah Jenkins', spec: 'Neurology', patients: 8, claims: 6, performance: '100%' },
        { id: 'D-103', name: 'Dr. A. Patel', spec: 'General Medicine', patients: 21, claims: 21, performance: '95%' }
    ]);

    const [patients, setPatients] = useState([
        { id: 'P-9012', name: 'Sarah J.', age: 34, gender: 'F', diagnosis: 'Migraine', status: 'Active Treatment' },
        { id: 'P-8134', name: 'Michael T.', age: 45, gender: 'M', diagnosis: 'Hypertension', status: 'Discharged' },
        { id: 'P-7721', name: 'Rebecca W.', age: 29, gender: 'F', diagnosis: 'Fracture', status: 'Active Treatment' }
    ]);

    // Graph Data
    const monthlyClaims = [45, 52, 38, 65, 48, 70];
    const maxMonthly = Math.max(...monthlyClaims);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/claims`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const data = await res.json();
                if (Array.isArray(data)) setClaims(data);
            } catch (error) {
                console.error("Failed to fetch claims:", error);
            }
        };
        fetchClaims();
    }, []);

    // Handlers
    const handleAddDoctor = (e) => {
        e.preventDefault();
        const newDoc = {
            id: `D-${Math.floor(Math.random() * 900) + 100}`,
            name: e.target.dname.value,
            spec: e.target.dspec.value,
            patients: 0, claims: 0, performance: '100%'
        };
        setDoctors([...doctors, newDoc]);
        setShowDoctorModal(false);
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        const newPat = {
            id: `P-${Math.floor(Math.random() * 9000) + 1000}`,
            name: e.target.pname.value,
            age: e.target.page.value,
            gender: e.target.pgender.value,
            diagnosis: e.target.pdiag.value,
            status: 'Active Treatment'
        };
        setPatients([...patients, newPat]);
        setShowPatientModal(false);
    };

    const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredDoctors = doctors.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.spec.toLowerCase().includes(searchQuery.toLowerCase()));

    const getTabClass = (tab) => activeTab === tab ? "btn-primary" : "btn-outline";
    const getTabStyle = (tab) => ({
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        textAlign: 'left', width: '100%',
        border: 'none',
        background: activeTab === tab ? '#1e293b' : 'transparent',
        color: activeTab === tab ? '#3b82f6' : '#cbd5e1',
        padding: '0.85rem 1.25rem', marginBottom: '0.25rem', borderRadius: '0.5rem',
        fontWeight: activeTab === tab ? '600' : '400',
        transition: 'all 0.2s'
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f8fafc', overflow: 'hidden' }}>
            {/* 1. Page Layout Structure: Top Navbar */}
            <header style={{
                background: '#0f172a', color: 'white', padding: '1rem 2rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid #1e293b'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '260px' }}>
                    <div style={{ background: '#3b82f6', padding: '0.5rem', borderRadius: '0.5rem' }}>💠</div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>Vediere Network</h2>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Global System Monitor</span>
                    </div>
                </div>

                <div style={{ flex: 1, maxWidth: '500px', position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search system (patients, doctors, claims)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem',
                            borderRadius: '2rem', border: '1px solid #334155',
                            background: '#1e293b', color: 'white', fontSize: '0.875rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: '2rem' }}>
                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                        <Bell size={20} color="#cbd5e1" />
                        {claims.filter(c => c.status === 'flagged_fraud').length > 0 && (
                            <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #0f172a' }}></span>
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', borderLeft: '1px solid #334155', paddingLeft: '1.5rem' }}>
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff" alt="Admin" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>System Admin</span>
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* 1. Page Layout Structure: Left Sidebar */}
                <aside style={{ width: '260px', background: '#0f172a', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b' }}>
                    <nav style={{ flex: 1 }}>
                        <button onClick={() => setActiveTab('overview')} style={getTabStyle('overview')}><LayoutDashboard size={18} /> Dashboard (Home)</button>
                        <button onClick={() => setActiveTab('patients')} style={getTabStyle('patients')}><Users size={18} /> Patient Management</button>
                        <button onClick={() => setActiveTab('doctors')} style={getTabStyle('doctors')}><UserCog size={18} /> Doctor Management</button>
                        <button onClick={() => setActiveTab('claims')} style={getTabStyle('claims')}><FileText size={18} /> Claims Monitoring</button>
                        <button onClick={() => setActiveTab('fraud')} style={getTabStyle('fraud')}><AlertTriangle size={18} /> Fraud Alerts</button>
                        <button onClick={() => setActiveTab('audit')} style={getTabStyle('audit')}><Database size={18} /> Audit Logs</button>
                        <button onClick={() => setActiveTab('reports')} style={getTabStyle('reports')}><BarChart3 size={18} /> Reports & Analytics</button>
                    </nav>

                    <div style={{ paddingTop: '1rem', borderTop: '1px solid #1e293b' }}>
                        <button onClick={() => setActiveTab('settings')} style={getTabStyle('settings')}><Settings size={18} /> Settings & Security</button>
                        <button style={{ ...getTabStyle('logout'), color: '#ef4444', marginTop: '0.5rem' }}><LogOut size={18} /> Secure Logout</button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>

                    {/* 2. Dashboard Overview */}
                    {activeTab === 'overview' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1.5rem', fontWeight: 'bold' }}>Global Systems Overview</h1>

                            {/* Key Metrics */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderBottom: '3px solid #3b82f6' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Patients</h3>
                                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a', marginTop: '0.5rem' }}>{patients.length + 1200}</p>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderBottom: '3px solid #8b5cf6' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Doctors</h3>
                                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a', marginTop: '0.5rem' }}>{doctors.length + 40}</p>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderBottom: '3px solid #eab308' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Claims Submitted</h3>
                                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a', marginTop: '0.5rem' }}>{claims.length || 0}</p>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderBottom: '3px solid #10b981' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Approved Claims</h3>
                                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#10b981', marginTop: '0.5rem' }}>{claims.filter(c => c.status === 'approved').length}</p>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderBottom: '3px solid #ef4444' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fraud Alerts 🚨</h3>
                                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#ef4444', marginTop: '0.5rem' }}>{claims.filter(c => c.status === 'flagged_fraud').length}</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                                {/* Graphs & Analytics */}
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0f172a' }}>Claims & Admissions Trend (Last 6 Months)</h3>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', height: '250px', gap: '1rem', paddingTop: '2rem', borderBottom: '1px solid #e2e8f0' }}>
                                        {monthlyClaims.map((val, i) => (
                                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{
                                                    width: '40px', background: 'linear-gradient(to top, #3b82f6, #60a5fa)',
                                                    height: `${(val / maxMonthly) * 100}%`, borderRadius: '4px 4px 0 0', position: 'relative'
                                                }}>
                                                    <span style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b' }}>{val}</span>
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>M{i + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}><div style={{ width: 12, height: 12, background: '#3b82f6', borderRadius: '2px' }}></div> Volume Processed</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}><div style={{ width: 12, height: 12, background: '#ef4444', borderRadius: '2px' }}></div> Fraud Rate: 2.1%</div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0f172a' }}>Live System Activity</h3>
                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <li style={{ fontSize: '0.875rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '0.75rem' }}>
                                            <div style={{ background: '#dcfce7', color: '#10b981', padding: '0.4rem', borderRadius: '0.25rem', height: 'fit-content' }}><Users size={14} /></div>
                                            <div><strong>Patient P-9012 Added</strong><br /><span style={{ color: '#64748b' }}>Dr. Smith registered new health record.</span></div>
                                        </li>
                                        {claims.slice(0, 3).map((c, i) => (
                                            <li key={i} style={{ fontSize: '0.875rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '0.75rem' }}>
                                                <div style={{ background: c.status === 'flagged_fraud' ? '#fee2e2' : '#e0f2fe', color: c.status === 'flagged_fraud' ? '#ef4444' : '#0ea5e9', padding: '0.4rem', borderRadius: '0.25rem', height: 'fit-content' }}>
                                                    {c.status === 'flagged_fraud' ? <AlertTriangle size={14} /> : <FileText size={14} />}
                                                </div>
                                                <div>
                                                    <strong style={{ color: c.status === 'flagged_fraud' ? '#ef4444' : '#0f172a' }}>
                                                        {c.status === 'flagged_fraud' ? 'AI Fraud Triggered' : 'Claim Initiated'}
                                                    </strong><br />
                                                    <span style={{ color: '#64748b' }}>${c.claimAmount} (ID: #{c._id?.toString().slice(-4)})</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Doctor Management */}
                    {activeTab === 'doctors' && (
                        <div className="fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div>
                                    <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 'bold' }}>Doctor Management</h1>
                                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Oversee hospital staff, assign departments, and track performance metrics.</p>
                                </div>
                                <button onClick={() => setShowDoctorModal(true)} className="btn-primary" style={{ background: '#10b981', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><Plus size={16} /> Add Doctor</button>
                            </div>
                            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Doctor Name</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Specialization</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Patients Handled</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Claims Initiated</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Performance</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDoctors.map(doc => (
                                            <tr key={doc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '1rem', fontWeight: '500', color: '#0f172a' }}>{doc.name}<br /><span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{doc.id}</span></td>
                                                <td style={{ padding: '1rem', color: '#64748b' }}><span style={{ background: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>{doc.spec}</span></td>
                                                <td style={{ padding: '1rem', color: '#64748b' }}>{doc.patients}</td>
                                                <td style={{ padding: '1rem', color: '#64748b' }}>{doc.claims}</td>
                                                <td style={{ padding: '1rem', color: '#10b981', fontWeight: 'bold' }}>{doc.performance}</td>
                                                <td style={{ padding: '1rem' }}><button style={{ color: '#3b82f6', background: '#eff6ff', padding: '0.25rem 0.75rem', borderRadius: '4px', border: '1px solid #bfdbfe', cursor: 'pointer', fontSize: '0.75rem' }}>Edit Dept</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 4. Patient Management */}
                    {activeTab === 'patients' && (
                        <div className="fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div>
                                    <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 'bold' }}>Patient Management</h1>
                                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Access immutable medical history, track treatments, and filter registered patients.</p>
                                </div>
                                <button onClick={() => setShowPatientModal(true)} className="btn-primary" style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><Plus size={16} /> Register Patient</button>
                            </div>
                            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Patient Details</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Age / Gender</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Current Diagnosis</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Treatment Status</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>History Vault</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPatients.map(pt => (
                                            <tr key={pt.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '1rem' }}>
                                                    <strong style={{ color: '#0f172a' }}>{pt.name}</strong><br />
                                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: {pt.id}</span>
                                                </td>
                                                <td style={{ padding: '1rem', color: '#64748b' }}>{pt.age} yrs / {pt.gender}</td>
                                                <td style={{ padding: '1rem', color: '#0f172a' }}>{pt.diagnosis}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{ background: pt.status === 'Discharged' ? '#f1f5f9' : '#dcfce7', color: pt.status === 'Discharged' ? '#64748b' : '#10b981', padding: '0.25rem 0.6rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '500' }}>
                                                        {pt.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}><button style={{ color: '#3b82f6', background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.25rem 0.75rem', cursor: 'pointer', fontSize: '0.75rem' }}>View EHR</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 5. Claims Monitoring */}
                    {activeTab === 'claims' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 'bold' }}>Live Claims Monitoring</h1>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Track real-time treatment costs and insurance provider sync status.</p>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'white', padding: '1rem 1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #10b981', flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Approved Claims</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a' }}>{claims.filter(c => c.status === 'approved').length}</div>
                                </div>
                                <div style={{ background: 'white', padding: '1rem 1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #eab308', flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Pending Evaluations</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a' }}>{claims.filter(c => c.status === 'pending').length}</div>
                                </div>
                            </div>

                            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Claim ID & Hash</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Patient & Provider Focus</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Treatment Cost</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status Layer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.map((claim, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '1rem', color: '#0f172a' }}>
                                                    <strong>#{claim._id?.toString().slice(-6)}</strong><br />
                                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace' }}>0x{claim._id}</span>
                                                </td>
                                                <td style={{ padding: '1rem', color: '#64748b' }}>
                                                    Pt: {claim.patientId?.slice(-6) || 'N/A'}<br />
                                                    HMO: Auth Connect
                                                </td>
                                                <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 'bold' }}>${(claim.claimAmount || 0).toLocaleString()}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        background: claim.status === 'approved' ? '#dcfce7' : (claim.status === 'flagged_fraud' ? '#fee2e2' : '#fef9c3'),
                                                        color: claim.status === 'approved' ? '#10b981' : (claim.status === 'flagged_fraud' ? '#ef4444' : '#eab308'),
                                                        padding: '0.25rem 0.6rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold'
                                                    }}>
                                                        {claim.status === 'flagged_fraud' ? 'FLAGGED REJECTED' : claim.status?.toUpperCase()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {claims.length === 0 && <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Awaiting initial system claim submission.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 6. Fraud Alerts Module */}
                    {activeTab === 'fraud' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <AlertTriangle color="#ef4444" /> AI Fraud Alerts Module
                            </h1>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Displays AI-detected anomalies highlighting risk levels and intelligent suggested actions.</p>

                            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Claim Targeting</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>AI Risk Level</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Fraud Reason Engine</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Suggested Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.filter(c => c.status === 'flagged_fraud').map((claim, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: '#fff1f2' }}>
                                                <td style={{ padding: '1rem', fontWeight: 'bold', color: '#ef4444' }}>#{claim._id?.toString().slice(-6)}</td>
                                                <td style={{ padding: '1rem' }}><span style={{ background: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}><AlertTriangle size={12} style={{ display: 'inline', marginRight: '2px' }} /> HIGH RISK ({claim.fraudScore || 92}%)</span></td>
                                                <td style={{ padding: '1rem', color: '#b91c1c', fontSize: '0.875rem' }}>{claim.aiNotes || 'Duplicate billing signature / Abnormal regional cost multiplier.'}</td>
                                                <td style={{ padding: '1rem' }}><button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)' }}>Halt & Investigate</button></td>
                                            </tr>
                                        ))}
                                        {claims.filter(c => c.status === 'flagged_fraud').length === 0 && (
                                            <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}><CheckCircle size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} /><br />No fraud activities detected across system network.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 7. Audit Logs */}
                    {activeTab === 'audit' && (
                        <div className="fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div>
                                    <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 'bold' }}>Immutable Audit Logs</h1>
                                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Tracking all system events, access paths, and data modifications.</p>
                                </div>
                                <button className="btn-outline" style={{ background: 'white', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}><Download size={16} /> Export Security PDF</button>
                            </div>

                            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Timestamp</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Network User</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Target Action Performed</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Verification Path</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>[NOW]</td>
                                            <td style={{ padding: '1rem', color: '#0f172a', fontWeight: '500' }}>Hospital Admin</td>
                                            <td style={{ padding: '1rem', color: '#3b82f6' }}>Authenticated access to Audit Dashboard</td>
                                            <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>IP: 192.168.1.1 (Verified Mac)</td>
                                        </tr>
                                        {claims.map((claim, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: claim.status === 'flagged_fraud' ? '#fff1f2' : 'transparent' }}>
                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>[-{idx + 1} hrs]</td>
                                                <td style={{ padding: '1rem', color: '#0f172a', fontWeight: '500' }}>Doctor Network Node</td>
                                                <td style={{ padding: '1rem', color: claim.status === 'flagged_fraud' ? '#ef4444' : '#0f172a' }}>
                                                    Processed Record for Patient {claim.patientId?.slice(-6) || 'Unknown'}. <br />
                                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Action Yield: {claim.status?.toUpperCase()}</span>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#10b981', fontFamily: 'monospace' }}><Shield size={12} style={{ display: 'inline' }} /> Hash: 0x{claim._id?.toString()}e9b1f2</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 8. Reports & Analytics */}
                    {activeTab === 'reports' && (
                        <div className="fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div>
                                    <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 'bold' }}>Reports & Analytics Module</h1>
                                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Generate hospital financial performance, fraud metrics, and deep PDF insights.</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #3b82f6' }}>
                                    <FileText size={32} color="#3b82f6" style={{ margin: '0 auto 1rem' }} />
                                    <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Claims Report</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>Monthly settlement and rejection rates.</p>
                                    <button style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}><Download size={16} /> Gen Excel/PDF</button>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #ef4444' }}>
                                    <AlertTriangle size={32} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
                                    <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Fraud Analysis</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>Detected anomaly trends and risk scores.</p>
                                    <button style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}><Download size={16} /> Gen Excel/PDF</button>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #10b981' }}>
                                    <Users size={32} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                                    <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Patient Demographics</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>Admission flows and core treatments.</p>
                                    <button style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}><Download size={16} /> Gen Excel/PDF</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 9 & 10. Settings & Security Compliance */}
                    {activeTab === 'settings' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1.5rem', fontWeight: 'bold' }}>Settings & Security Control</h1>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ background: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><UserCog size={18} /> Hospital Profile Upkeep</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <input type="text" defaultValue="City Central Network" style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none' }} />
                                        <input type="email" defaultValue="admin@citycentral.health" style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none' }} />
                                        <button style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>Update Directory</button>
                                    </div>
                                </div>

                                <div style={{ background: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={18} /> RBAC & Compliance Toggles</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                                            <div><strong>Blockchain Ledger Sink</strong><br /><span style={{ fontSize: '0.75rem', color: '#64748b' }}>Sync claim hashes instantly to chain.</span></div>
                                            <div style={{ width: '40px', height: '20px', background: '#10b981', borderRadius: '1rem', position: 'relative' }}><div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div></div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                                            <div><strong>Data Encryption Layer 256</strong><br /><span style={{ fontSize: '0.75rem', color: '#64748b' }}>Encrypt database records proactively.</span></div>
                                            <div style={{ width: '40px', height: '20px', background: '#10b981', borderRadius: '1rem', position: 'relative' }}><div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>

            {/* Modals placed globally within the layout */}
            {showDoctorModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', width: '400px', padding: '2rem', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Onboard New Doctor</h2>
                            <XCircle style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setShowDoctorModal(false)} />
                        </div>
                        <form onSubmit={handleAddDoctor} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input name="dname" type="text" placeholder="Full Doctor Name" required style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem' }} />
                            <select name="dspec" required style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', background: 'white' }}>
                                <option value="Internal Medicine">Internal Medicine</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Oncology">Oncology</option>
                                <option value="Pediatrics">Pediatrics</option>
                            </select>
                            <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>Initiate Blockchain ID & Assign</button>
                        </form>
                    </div>
                </div>
            )}

            {showPatientModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', width: '400px', padding: '2rem', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Register Patient Node</h2>
                            <XCircle style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setShowPatientModal(false)} />
                        </div>
                        <form onSubmit={handleAddPatient} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input name="pname" type="text" placeholder="Patient Full Legal Name" required style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem' }} />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input name="page" type="number" placeholder="Age" required style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', width: '50%' }} />
                                <select name="pgender" required style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', width: '50%', background: 'white' }}>
                                    <option value="M">Male (M)</option>
                                    <option value="F">Female (F)</option>
                                </select>
                            </div>
                            <input name="pdiag" type="text" placeholder="Current Diagnosis" required style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem' }} />
                            <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>Secure Patient in Vault</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
