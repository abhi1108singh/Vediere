import React, { useState, useEffect } from 'react';
import { Users, Calendar, Activity, Upload, FileText, AlertCircle, ShieldAlert } from 'lucide-react';

export default function DoctorDashboard() {
    const [claims, setClaims] = useState([]);
    const [formData, setFormData] = useState({ patientId: '60d5ecb8b392d47c20c02c40', claimAmount: '', diagnosis: '' });

    const handleClaimSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/claims`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    patientId: formData.patientId, // Random valid Mock ID
                    insuranceId: '60d5ecb8b392d47c20c02c41', // Mock ID
                    recordId: '60d5ecb8b392d47c20c02c42', // Mock ID
                    claimAmount: Number(formData.claimAmount)
                })
            });
            if (res.ok) {
                alert('Success! Claim saved under Tamper-Proof Backend Ledger.');
                window.location.reload();
            } else {
                const data = await res.json();
                alert('Server Error: ' + data.message);
            }
        } catch (err) {
            alert('Failed to connect to backend.');
        }
    };

    useEffect(() => {
        const fetchClaims = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/claims`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            if (Array.isArray(data)) setClaims(data);
        };
        fetchClaims();
    }, []);
    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', borderRight: '1px solid var(--border-color)', background: 'var(--bg-accent)', padding: '2rem 1rem' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li><a href="#" className="btn-primary" style={{ display: 'block', textAlign: 'left', width: '100%' }}>Overview Panel</a></li>
                    <li><a href="#" className="btn-outline" style={{ display: 'block', textAlign: 'left', width: '100%', border: 'none' }}>Patient Records</a></li>
                    <li><a href="#" className="btn-outline" style={{ display: 'block', textAlign: 'left', width: '100%', border: 'none' }}>Treatment Entry</a></li>
                    <li><a href="#" className="btn-outline" style={{ display: 'block', textAlign: 'left', width: '100%', border: 'none' }}>Claim Initiation</a></li>
                    <li><a href="#" className="btn-outline" style={{ display: 'block', textAlign: 'left', width: '100%', border: 'none', color: '#ef4444' }}>Alerts & Notifications</a></li>
                </ul>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem 3rem', background: '#fcfcfc' }}>
                <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Doctor Area: Dr. John Smith</h1>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Manage patient records, update treatments, and submit claims.</p>

                {/* Overview Stats */}
                <div className="grid-3" style={{ marginBottom: '3rem' }}>
                    <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                        <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}><Users size={16} style={{ display: 'inline', marginRight: '4px' }} />Claims Processed</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{claims.length || 0}</p>
                    </div>
                    <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                        <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}><Calendar size={16} style={{ display: 'inline', marginRight: '4px' }} />Pending Claims</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{claims.filter(c => c.status === 'pending').length}</p>
                    </div>
                    <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
                        <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}><ShieldAlert size={16} style={{ display: 'inline', marginRight: '4px' }} />Fraud Flag Alerts</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{claims.filter(c => c.status === 'flagged_fraud').length}</p>
                    </div>
                </div>

                {/* Treatment Entry & Recent Patients */}
                <div className="grid-2">
                    {/* Patient Records Quick View */}
                    <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={20} /> Recent Patient Records
                        </h2>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {claims.map((claim, idx) => (
                                <li key={idx} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <strong>{claim.patientId?.name || claim.patientId?.slice(-6) || 'Unknown Patient'} (Claim #{claim._id?.toString().slice(-4)})</strong>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Status: {claim.status?.toUpperCase()}</p>
                                    </div>
                                    <button className="btn-outline" style={{ padding: '0.5rem 1rem' }}>View History</button>
                                </li>
                            ))}
                            {claims.length === 0 && <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>No active patient claims directly assigned today.</p>}
                        </ul>
                    </div>

                    {/* Quick Treatment Entry */}
                    <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={20} /> Quick Treatment Entry
                        </h2>
                        <form onSubmit={handleClaimSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input value={formData.patientId} onChange={e => setFormData({ ...formData, patientId: e.target.value })} type="text" placeholder="Patient ID (ex: 60d5ecb8b392d47c20c02c40)" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />
                            <input value={formData.claimAmount} onChange={e => setFormData({ ...formData, claimAmount: e.target.value })} type="number" placeholder="Claim Amount in USD ($)" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />
                            <textarea value={formData.diagnosis} onChange={e => setFormData({ ...formData, diagnosis: e.target.value })} placeholder="Diagnosis details..." rows="3" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}></textarea>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" className="btn-outline" style={{ flex: 1, padding: '0.5rem' }}><Upload size={16} /> Upload Lab</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.5rem' }}>Save & Hash to Blockchain</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Security Pipeline Visual */}
                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>System Security Pipeline</h2>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', overflowX: 'auto', paddingBottom: '1rem' }}>

                        <div style={{ flex: '1', minWidth: '150px', background: '#dcfce7', border: '1px solid var(--primary-dark)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                            <strong style={{ fontSize: '0.875rem' }}>User Interface</strong>
                            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-light)' }}>Web App (Doctor)</div>
                        </div>

                        <div style={{ color: 'var(--primary)' }}>▶</div>

                        <div style={{ flex: '1.5', minWidth: '200px', background: '#f8fafc', border: '1px solid var(--primary)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                            <strong style={{ fontSize: '0.875rem' }}>Application Layer</strong>
                            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-light)' }}>Patient Records & Claims</div>
                        </div>

                        <div style={{ color: 'var(--primary)' }}>▶</div>

                        <div style={{ flex: '1', minWidth: '150px', background: '#f8fafc', border: '1px solid var(--primary)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                            <strong style={{ fontSize: '0.875rem' }}>Security Layer</strong>
                            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-light)' }}>Encryption & Sigs</div>
                        </div>

                        <div style={{ color: 'var(--primary)' }}>▶</div>

                        <div style={{ flex: '1', minWidth: '150px', background: '#f1f5f9', border: '1px solid #475569', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                            <strong style={{ fontSize: '0.875rem' }}>Immutable Storage</strong>
                            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-light)' }}>Blockchain Ledger</div>
                        </div>

                        <div style={{ color: 'var(--primary)' }}>▶</div>

                        <div style={{ flex: '1', minWidth: '150px', background: '#f1f5f9', border: '1px solid #475569', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                            <strong style={{ fontSize: '0.875rem' }}>Database</strong>
                            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-light)' }}>Encrypted DB</div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
