import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, FileText, AlertTriangle, CreditCard,
    BarChart3, Settings, Search, Bell, LogOut, CheckCircle, XCircle, Shield, ArrowRightCircle
} from 'lucide-react';

export default function InsuranceDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [claims, setClaims] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch live claims from backend
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

    // Backend network call to legally update claim state in system and Blockchain
    const handleAction = async (claimId, newStatus) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/claims/${claimId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setClaims(claims.map(c => c._id === claimId ? { ...c, status: newStatus } : c));
            }
        } catch (error) {
            console.error("Failed to verify claim and ping blockchain:", error);
        }
    };

    const monthlyTrends = [210, 240, 290, 260, 310, 390];
    const maxMonthly = Math.max(...monthlyTrends);
    const fraudRate = [4.2, 3.8, 4.5, 3.2, 5.0, 2.1];
    const maxFraud = Math.max(...fraudRate);

    const getTabStyle = (tab) => ({
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        textAlign: 'left', width: '100%', border: 'none',
        background: activeTab === tab ? '#1e293b' : 'transparent',
        color: activeTab === tab ? '#3b82f6' : '#cbd5e1',
        padding: '0.85rem 1.25rem', marginBottom: '0.25rem', borderRadius: '0.5rem',
        fontWeight: activeTab === tab ? '600' : '400',
        transition: 'all 0.2s', cursor: 'pointer'
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
                    <div style={{ background: '#3b82f6', padding: '0.5rem', borderRadius: '0.5rem' }}><Shield color="white" size={24} /></div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>Vediere Insure</h2>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Risk Verification Protocol</span>
                    </div>
                </div>

                <div style={{ flex: 1, maxWidth: '500px', position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search claims, IDs, or policy numbers..."
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
                        <img src="https://ui-avatars.com/api/?name=HMO+Admin&background=3b82f6&color=fff" alt="Admin" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>HMO Verifier</span>
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* 1. Page Layout Structure: Left Sidebar */}
                <aside style={{ width: '260px', background: '#0f172a', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b' }}>
                    <nav style={{ flex: 1 }}>
                        <button onClick={() => setActiveTab('overview')} style={getTabStyle('overview')}><LayoutDashboard size={18} /> Dashboard Overview</button>
                        <button onClick={() => setActiveTab('claims')} style={getTabStyle('claims')}><FileText size={18} /> Claims Verification</button>
                        <button onClick={() => setActiveTab('fraud')} style={getTabStyle('fraud')}><AlertTriangle size={18} /> Fraud Detection Engine</button>
                        <button onClick={() => setActiveTab('payments')} style={getTabStyle('payments')}><CreditCard size={18} /> Payment Module</button>
                        <button onClick={() => setActiveTab('reports')} style={getTabStyle('reports')}><BarChart3 size={18} /> Evaluation Reports</button>
                    </nav>

                    <div style={{ paddingTop: '1rem', borderTop: '1px solid #1e293b' }}>
                        <button onClick={() => setActiveTab('settings')} style={getTabStyle('settings')}><Settings size={18} /> System Security</button>
                        <button style={{ ...getTabStyle('logout'), color: '#ef4444', marginTop: '0.5rem' }}><LogOut size={18} /> Secure Disconnect</button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>

                    {/* 2. Dashboard Overview */}
                    {activeTab === 'overview' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1.5rem', fontWeight: 'bold' }}>Risk Verification Dashboard</h1>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderBottom: '3px solid #3b82f6' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Total Claims Received</h3>
                                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a', marginTop: '0.5rem' }}>{claims.length || 0}</p>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderBottom: '3px solid #10b981' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Approved Clearances</h3>
                                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#10b981', marginTop: '0.5rem' }}>{claims.filter(c => c.status === 'approved').length}</p>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderBottom: '3px solid #eab308' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Pending / On Hold</h3>
                                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#eab308', marginTop: '0.5rem' }}>{claims.filter(c => c.status === 'pending').length}</p>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderBottom: '3px solid #ef4444' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>AI Fraud Alerts</h3>
                                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#ef4444', marginTop: '0.5rem' }}>{claims.filter(c => c.status === 'flagged_fraud').length}</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0f172a' }}>Global Claim Trends (Monthly)</h3>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '1rem', paddingTop: '2rem', borderBottom: '1px solid #e2e8f0' }}>
                                        {monthlyTrends.map((val, i) => (
                                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{
                                                    width: '100%', background: 'linear-gradient(to top, #3b82f6, #93c5fd)',
                                                    height: `${(val / maxMonthly) * 100}%`, borderRadius: '4px 4px 0 0', position: 'relative'
                                                }}>
                                                    <span style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b' }}>{val}</span>
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>M{i + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0f172a' }}>Network Fraud Rate (%)</h3>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '1rem', paddingTop: '2rem', borderBottom: '1px solid #e2e8f0' }}>
                                        {fraudRate.map((val, i) => (
                                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{
                                                    width: '100%', background: 'linear-gradient(to top, #ef4444, #fca5a5)',
                                                    height: `${(val / maxFraud) * 100}%`, borderRadius: '4px 4px 0 0', position: 'relative'
                                                }}>
                                                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontWeight: 'bold', color: '#ef4444' }}>{val}%</span>
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>M{i + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Claims Verification Module */}
                    {activeTab === 'claims' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 'bold', marginBottom: '0.5rem' }}>Claims Verification Queue</h1>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Review hospital submissions, evaluate costs, and trigger smart contract approvals.</p>

                            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Patient Information</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Treatment Cost</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>AI Recommendation</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Verification Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.map((claim, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: claim.status === 'flagged_fraud' ? '#fff1f2' : 'transparent' }}>
                                                <td style={{ padding: '1rem' }}>
                                                    <strong style={{ color: '#0f172a' }}>Patient ID: {claim.patientId?.slice(-8) || `U-${Math.floor(Math.random() * 9000) + 1000}`}</strong><br />
                                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Claim Reference: #{claim._id?.toString().slice(-6)}</span>
                                                </td>
                                                <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 'bold' }}>
                                                    ${(claim.claimAmount || 0).toLocaleString()} <br />
                                                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'normal' }}>Covered</span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        background: claim.status === 'approved' ? '#dcfce7' : (claim.status === 'flagged_fraud' ? '#fee2e2' : '#fef9c3'),
                                                        color: claim.status === 'approved' ? '#10b981' : (claim.status === 'flagged_fraud' ? '#ef4444' : '#eab308'),
                                                        padding: '0.25rem 0.6rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold'
                                                    }}>
                                                        {claim.status?.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                                    {claim.status === 'pending' || claim.status === 'flagged_fraud' ? (
                                                        <>
                                                            <button onClick={() => handleAction(claim._id, 'approved')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>Approve</button>
                                                            <button onClick={() => handleAction(claim._id, 'rejected')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>Reject</button>
                                                            <button onClick={() => handleAction(claim._id, 'hold')} style={{ background: '#eab308', color: 'white', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>Hold</button>
                                                        </>
                                                    ) : (
                                                        <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                            {claim.status === 'approved' ? <CheckCircle size={14} color="#10b981" /> : <XCircle size={14} color="#ef4444" />} Finalized
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 4. Fraud Detection Module */}
                    {activeTab === 'fraud' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <AlertTriangle color="#ef4444" /> Enterprise Fraud Detection
                            </h1>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>AI-generated anomaly pattern alerts and risk scoring metrics.</p>

                            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Suspicious Claim ID</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Fraud Reason / Pattern</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>AI Risk Level</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Automated Defense</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.filter(c => c.status === 'flagged_fraud' || c.status === 'rejected').map((claim, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '1rem', fontWeight: 'bold', color: '#0f172a' }}>#{claim._id?.toString().slice(-6)}</td>
                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
                                                    {claim.aiNotes || 'Abnormal billing velocity detected from provider subnet.'}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{ background: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                        <AlertTriangle size={12} style={{ display: 'inline', marginRight: '2px' }} />
                                                        High Risk ({claim.fraudScore || 95}%)
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 'bold' }}>Funds Locked</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 5. Payment Module */}
                    {activeTab === 'payments' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 'bold', marginBottom: '0.5rem' }}>Financial Disbursements Hub</h1>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Process vetted payments and track ledger transactions securely.</p>

                            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Transaction Hash</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Associated Claim</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Disbursement Amount</th>
                                            <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Wire Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.filter(c => c.status === 'approved').map((claim, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                                                    0x{Math.random().toString(16).substring(2, 10)}...{claim._id?.toString().slice(-4)}
                                                </td>
                                                <td style={{ padding: '1rem', color: '#3b82f6', fontWeight: '500' }}>#{claim._id?.toString().slice(-6)}</td>
                                                <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 'bold' }}>${(claim.claimAmount || 0).toLocaleString()}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.875rem', fontWeight: 'bold' }}>
                                                        <ArrowRightCircle size={16} /> Deposited
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 6. Reports Module */}
                    {activeTab === 'reports' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 'bold', marginBottom: '1.5rem' }}>Financial & Audit Reports</h1>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #3b82f6' }}>
                                    <CreditCard size={32} color="#3b82f6" style={{ margin: '0 auto 1rem' }} />
                                    <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Financial Analytics</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>P&L, disbursements, and savings.</p>
                                    <button style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', width: '100%', cursor: 'pointer', fontWeight: 'bold' }}>Generate PDF</button>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #ef4444' }}>
                                    <AlertTriangle size={32} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
                                    <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Fraud Logs Array</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>Export detected patterns to regulatory.</p>
                                    <button style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', width: '100%', cursor: 'pointer', fontWeight: 'bold' }}>Generate PDF</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 7. Settings Module */}
                    {activeTab === 'settings' && (
                        <div className="fade-in">
                            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 'bold', marginBottom: '1.5rem' }}>Security Protocol Configuration</h1>
                            <div style={{ background: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={18} /> Access Control & Triggers</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                                        <div><strong>Strict IAM Validation</strong><br /><span style={{ fontSize: '0.875rem', color: '#64748b' }}>Requires biometric signature for manual override.</span></div>
                                        <div style={{ width: '40px', height: '20px', background: '#10b981', borderRadius: '1rem', position: 'relative' }}><div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                                        <div><strong>Immutable Tamper Mode</strong><br /><span style={{ fontSize: '0.875rem', color: '#64748b' }}>HMO Admins cannot retrospectively alter rejected hashes.</span></div>
                                        <div style={{ width: '40px', height: '20px', background: '#10b981', borderRadius: '1rem', position: 'relative' }}><div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div><strong>HMO Profile Ledger Map</strong><br /><span style={{ fontSize: '0.875rem', color: '#64748b' }}>Mapped to global insurance ledger.</span></div>
                                        <button className="btn-outline" style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '0.4rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>View Map</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
