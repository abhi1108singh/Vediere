import React, { useState, useEffect } from 'react';
import { UserCircle, Shield, FileText, CheckCircle, Bell, Lock, Layout, Globe, Server, Layers, Database } from 'lucide-react';

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch real claim data from the backend when dashboard loads
        const fetchClaims = async () => {
            try {
                const data = await patientApi.getClaims();
                if (Array.isArray(data)) {
                    setClaims(data);
                }
            } catch (err) {
                console.error("Failed to fetch claims:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchClaims();
    }, []);

    const getTabClass = (tabId) => {
        return activeTab === tabId ? "btn-primary" : "btn-outline";
    };
    const getTabStyle = (tabId) => {
        return activeTab === tabId ?
            { display: 'block', textAlign: 'left', width: '100%', marginBottom: '0.5rem' } :
            { display: 'block', textAlign: 'left', width: '100%', border: 'none', marginBottom: '0.5rem' };
    };

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
            <aside style={{ width: '250px', borderRight: '1px solid var(--border-color)', background: 'var(--bg-accent)', padding: '2rem 1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <UserCircle size={64} style={{ color: 'var(--text-light)', margin: '0 auto 0.5rem' }} />
                    <h3 style={{ fontSize: '1.1rem' }}>John Doe</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>ID: PT-90123</p>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column' }}>
                    <button onClick={() => setActiveTab('overview')} className={getTabClass('overview')} style={getTabStyle('overview')}>Overview Panel</button>
                    <button onClick={() => setActiveTab('records')} className={getTabClass('records')} style={getTabStyle('records')}>Medical Records</button>
                    <button onClick={() => setActiveTab('claims')} className={getTabClass('claims')} style={getTabStyle('claims')}>Claim Tracking</button>
                    <button onClick={() => setActiveTab('notifications')} className={getTabClass('notifications')} style={getTabStyle('notifications')}>Notifications</button>
                    <button onClick={() => setActiveTab('profile')} className={getTabClass('profile')} style={getTabStyle('profile')}>Profile & Security</button>
                </nav>
            </aside>

            <main style={{ flex: 1, padding: '2rem 3rem', background: '#fcfcfc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Personal Health Portal</h1>
                        <p style={{ color: 'var(--text-light)' }}>View medical data and track insurance claims securely.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ecfdf5', padding: '0.5rem 1rem', borderRadius: '2rem', color: '#10b981', border: '1px solid #10b981' }}>
                        <Lock size={16} /> <span>Data Secured via Blockchain</span>
                    </div>
                </div>

                {activeTab === 'overview' && (
                    <>
                        <div className="grid-3" style={{ marginBottom: '3rem' }}>
                            <div className="card">
                                <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Active Claims</h3>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{claims.filter(c => c.status === 'pending').length}</p>
                                <p style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem' }}>{loading ? 'Loading...' : 'Processing normally.'}</p>
                            </div>
                            <div className="card">
                                <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Recent Treatments</h3>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{claims.length || 0}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Securely indexed.</p>
                            </div>
                            <div className="card">
                                <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Total Approvals</h3>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                                    ${claims.filter(c => c.status === 'approved').reduce((acc, curr) => acc + curr.claimAmount, 0).toLocaleString()}
                                </p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Approved claim payout.</p>
                            </div>
                        </div>

                        {/* Patient Architecture Pipeline Visualizer */}
                        <div style={{ marginTop: '3rem', padding: '2rem', background: 'white', borderRadius: '0.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Server size={20} color="var(--primary)" /> Live System Architecture Pipeline
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', width: '100%' }}>
                                {/* Level 1: User & Frontend */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', width: '250px', textAlign: 'center' }}>
                                        <UserCircle size={28} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                                        <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Patient (User)</h4>
                                    </div>
                                    <div style={{ height: '20px', width: '2px', background: 'var(--primary)' }}></div>
                                    <div style={{ width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary)', marginBottom: '10px' }}></div>

                                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', width: '250px', textAlign: 'center' }}>
                                        <Layout size={24} style={{ color: '#3b82f6', marginBottom: '0.5rem' }} />
                                        <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Frontend Application</h4>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-light)' }}>Web / Mobile App</p>
                                    </div>
                                    <div style={{ height: '20px', width: '2px', background: 'var(--primary)' }}></div>
                                    <div style={{ width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary)', marginBottom: '10px' }}></div>
                                </div>

                                {/* Level 2: API Gateway */}
                                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px dashed var(--primary)', width: '350px', textAlign: 'center' }}>
                                    <Globe size={24} style={{ color: '#8b5cf6', marginBottom: '0.5rem' }} />
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>API Gateway</h4>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-light)' }}>Handling Routes & Traffic</p>
                                </div>
                                <div style={{ height: '20px', width: '2px', background: 'var(--primary)' }}></div>
                                <div style={{ width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary)', marginBottom: '10px' }}></div>

                                {/* Level 3: Backend Services */}
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid var(--border-color)', width: '100%', maxWidth: '600px' }}>
                                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                        <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-dark)' }}>Backend Microservices Layer</h4>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.875rem', textAlign: 'center' }}>⚙️ Patient Profile Service</div>
                                        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.875rem', textAlign: 'center' }}>⚙️ Medical Records Service</div>
                                        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.875rem', textAlign: 'center' }}>⚙️ Claim Tracking Service</div>
                                        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.875rem', textAlign: 'center' }}>⚙️ Notification Service</div>
                                        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.875rem', textAlign: 'center', gridColumn: 'span 2' }}>🔐 Authentication Service</div>
                                    </div>
                                </div>
                                <div style={{ height: '20px', width: '2px', background: 'var(--primary)' }}></div>
                                <div style={{ width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary)', marginBottom: '10px' }}></div>

                                {/* Level 4: Security Layer */}
                                <div style={{ background: '#fee2e2', padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid #ef4444', width: '450px', textAlign: 'center', color: '#b91c1c' }}>
                                    <Shield size={24} style={{ marginBottom: '0.5rem' }} />
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Security Layer</h4>
                                    <p style={{ margin: 0, fontSize: '0.75rem', marginTop: '0.25rem' }}>End-to-End Encryption | Strong Access Control</p>
                                </div>
                                <div style={{ height: '20px', width: '2px', background: 'var(--primary)' }}></div>
                                <div style={{ width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary)', marginBottom: '10px' }}></div>

                                {/* Level 5: Blockchain */}
                                <div style={{ background: '#dcfce7', padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid #10b981', width: '450px', textAlign: 'center', color: '#047857' }}>
                                    <Layers size={24} style={{ marginBottom: '0.5rem' }} />
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Tamper-Proof Storage Layer</h4>
                                    <p style={{ margin: 0, fontSize: '0.75rem', marginTop: '0.25rem' }}>Blockchain Base / Immutable Ledger Log</p>
                                </div>
                                <div style={{ height: '20px', width: '2px', background: 'var(--primary)' }}></div>
                                <div style={{ width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary)', marginBottom: '10px' }}></div>

                                {/* Level 6: Database */}
                                <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #94a3b8', width: '450px', textAlign: 'center', color: '#334155' }}>
                                    <Database size={32} style={{ marginBottom: '0.5rem', color: '#475569' }} />
                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Database Layer</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem', marginTop: '0.5rem' }}>Patient Data | Claims | Encrypted Records</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'claims' && (
                    <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={20} color="var(--primary)" /> Claim Tracking: #C-10901
                        </h2>
                        {claims.length === 0 ? <p style={{ color: 'var(--text-light)' }}>No active claims right now.</p> : claims.map((claim, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingLeft: '2rem', borderLeft: '3px solid var(--border-color)', margin: '0 1rem 3rem 1rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Claim for ${(claim.claimAmount || 0).toLocaleString()} (ID: {claim._id?.toString().slice(-6)})</h3>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '-42px', top: '2px', background: '#10b981', borderRadius: '50%', padding: '4px' }}><CheckCircle size={16} color="white" /></span>
                                    <strong style={{ fontSize: '1.1rem' }}>Hospital Data Encrypted</strong>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Your visit data was hashed and secured on the ledger.</p>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '-42px', top: '2px', background: claim.status === 'flagged_fraud' ? '#ef4444' : '#10b981', borderRadius: '50%', padding: '4px' }}><CheckCircle size={16} color="white" /></span>
                                    <strong style={{ fontSize: '1.1rem' }}>AI Fraud Check</strong>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>{claim.status === 'flagged_fraud' ? 'System flagged anomalies in your billing.' : 'The automated AI review found no anomalies.'}</p>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '-38px', top: '2px', background: claim.status === 'pending' || claim.status === 'flagged_fraud' ? 'white' : '#10b981', border: claim.status === 'approved' ? 'none' : '3px solid #3b82f6', borderRadius: '50%', width: '16px', height: '16px' }}></span>
                                    <strong style={{ fontSize: '1.1rem' }}>{claim.status === 'approved' ? 'Insurance Approved' : 'Pending Insurance Approval'}</strong>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Your Health Maintenance Organization (HMO) is processing the contract.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'records' && (
                    <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={20} /> Encrypted Medical Records
                        </h2>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', background: 'var(--bg-accent)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <strong style={{ fontSize: '1.1rem' }}>General Checkup & Lab Work</strong>
                                    <span style={{ fontSize: '0.875rem', background: '#dcfce7', padding: '0.25rem 0.5rem', borderRadius: '4px', color: '#10b981' }}>Verified via Blockchain</span>
                                </div>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', marginBottom: '1rem' }}><strong>Doctor:</strong> Dr. John Smith • City Central Hospital</p>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}><strong>Diagnosis:</strong> Routine check, vital signs stable, blood panel processed without incident.</p>
                                <button className="btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}><Lock size={14} style={{ display: 'inline', marginRight: '5px' }} /> Download Encrypted PDF</button>
                            </li>
                            <li style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <strong style={{ fontSize: '1.1rem' }}>Dental Surgery</strong>
                                    <span style={{ fontSize: '0.875rem', background: '#dcfce7', padding: '0.25rem 0.5rem', borderRadius: '4px', color: '#10b981' }}>Verified via Blockchain</span>
                                </div>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', marginBottom: '1rem' }}><strong>Doctor:</strong> Dr. Sarah Jenkins • Dental Cares</p>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}><strong>Diagnosis:</strong> Wisdom tooth extraction. Prescribed post-op antibiotics.</p>
                                <button className="btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}><Lock size={14} style={{ display: 'inline', marginRight: '5px' }} /> Download Encrypted PDF</button>
                            </li>
                        </ul>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bell size={20} /> Notifications & Alerts
                        </h2>
                        <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '0.5rem' }}>
                            <Shield size={48} style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>All Clear!</h3>
                            <p style={{ color: 'var(--text-light)' }}>There have been no unauthorized access attempts or suspicious claim activities involving your account.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <UserCircle size={20} /> Profile & Security settings
                        </h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
                                <strong>Multi-Factor Authentication (MFA)</strong>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Biometric lock is active on your mobile app.</p>
                                <button className="btn-outline" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Manage MFA</button>
                            </div>
                            <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
                                <strong>Data Sharing Permissions</strong>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Manage which hospitals and insurance providers can read your immutable records.</p>
                                <button className="btn-outline" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Revoke Access</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

/**
 * API Service Layer for Patient Dashboard
 * Connects to the API Gateway to interact with backend microservices.
 */
const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
});

// eslint-disable-next-line react-refresh/only-export-components
export const patientApi = {
    // Patient Profile Service
    getProfile: () => fetch(`${API_BASE}/patient/profile`, { headers: getHeaders() }).then(res => res.json()),

    // Medical Records Service (Blockchain-verified)
    getRecords: () => fetch(`${API_BASE}/records`, { headers: getHeaders() }).then(res => res.json()),
    downloadEncryptedRecord: (recordId) => fetch(`${API_BASE}/records/${recordId}/download`, {
        headers: getHeaders()
    }).then(res => res.blob()),

    // Claim Tracking Service connected to node backend (api/claims)
    getClaims: () => fetch(`${API_BASE}/claims`, { headers: getHeaders() }).then(res => res.json()),

    // Notification Service
    getNotifications: () => fetch(`${API_BASE}/patient/notifications`, { headers: getHeaders() }).then(res => res.json()),

    // Security Layer: Update MFA/Permissions
    updateSecuritySettings: (settings) => fetch(`${API_BASE}/patient/security`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(settings)
    }).then(res => res.json())
};
