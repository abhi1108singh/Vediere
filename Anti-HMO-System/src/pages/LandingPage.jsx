import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, FileText, Database, Activity, CheckCircle, ActivitySquare, AlertTriangle } from 'lucide-react';

export default function LandingPage() {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-badges">
                        <span className="badge"><Lock size={16} /> Tamper-Proof Records</span>
                        <span className="badge"><Activity size={16} /> AI Fraud Detection</span>
                        <span className="badge"><Database size={16} /> Blockchain Ledger</span>
                    </div>
                    <h1 className="hero-title">
                        India's First <span className="text-primary">Tamper-Proof AI-Powered</span> Healthcare Fraud Prevention Platform
                    </h1>
                    <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                        Secure medical data, automate HMO claim audits, and detect fraudulent activities in real-time with our self-auditing architecture.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <Link to="/login" className="btn-primary">Get Started</Link>
                        <button className="btn-outline">Watch Demo</button>
                    </div>

                    <div className="hero-image-container" style={{ marginTop: '4rem' }}>
                        <img
                            src="/hero_doctor.png"
                            alt="Healthcare System Doctor Professional"
                            className="hero-image"
                            style={{ width: '100%', maxWidth: '800px', height: '400px', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* Proof You Can Measure */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Proof You Can Measure</h2>
                        <p className="section-subtitle">Real-time insights and immutable security for your healthcare enterprise.</p>
                    </div>

                    <div className="grid-3">
                        <div className="card">
                            <div className="card-icon"><Database size={24} /></div>
                            <h3 className="card-title">100% Immutable</h3>
                            <p className="card-desc">Every medical record and claim is locked into a secondary blockchain ledger, ensuring zero tampering.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><ActivitySquare size={24} /></div>
                            <h3 className="card-title">$2M+ Saved</h3>
                            <p className="card-desc">Our AI engine has successfully flagged over $2M in duplicate billing and overcharges automatically.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><CheckCircle size={24} /></div>
                            <h3 className="card-title">Zero Trust Auth</h3>
                            <p className="card-desc">Strict Role-Based Access Control and cryptographic signatures govern all transactions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Steps */}
            <section id="how-it-works" className="section" style={{ background: 'var(--bg-accent)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How The System Works</h2>
                        <p className="section-subtitle">A seamless pipeline from patient visit to validated insurance claim.</p>
                    </div>

                    <div className="steps-container">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h4>Patient Entry</h4>
                            <p className="card-desc" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Doctor logs diagnosis securely.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h4>Encryption</h4>
                            <p className="card-desc" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Data hashed to blockchain.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h4>Claim Auto-Submit</h4>
                            <p className="card-desc" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>HMO claim sent to insurer.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">4</div>
                            <h4>AI Analysis</h4>
                            <p className="card-desc" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Checks for fraud/duplicates.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">5</div>
                            <h4>Smart Contract</h4>
                            <p className="card-desc" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Approves or flags claim.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section id="use-cases" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Use Cases of the System</h2>
                        <p className="section-subtitle">Real-world scenarios where tampering and fraud are completely eliminated.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>

                        {/* 1 */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>🧑‍⚕️ Genuine Claim</h3>
                            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Scenario:</strong> Patient receives treatment and submits claim.</p>
                            <ul style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                                <li>Doctor securely records data</li>
                                <li>AI verifies authenticity</li>
                                <li>Auto-approval via Smart Contract</li>
                            </ul>
                            <div style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, background: '#dcfce7', padding: '0.5rem', borderRadius: '4px' }}>
                                👉 Outcome: Faster and accurate processing
                            </div>
                        </div>

                        {/* 2 */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>🚨 Fraudulent Detection</h3>
                            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Scenario:</strong> Hospital submits claim for unperformed treatment.</p>
                            <ul style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                                <li>AI detects record mismatches</li>
                                <li>Flags claim as highly suspicious</li>
                                <li>Alerts insurance provider</li>
                            </ul>
                            <div style={{ fontSize: '0.875rem', color: '#b91c1c', fontWeight: 600, background: '#fee2e2', padding: '0.5rem', borderRadius: '4px' }}>
                                👉 Outcome: Fraud prevented before payment
                            </div>
                        </div>

                        {/* 3 */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>🔁 Duplicate Prevention</h3>
                            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Scenario:</strong> Multiple submissions of the exact same claim.</p>
                            <ul style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                                <li>System indexes claim history</li>
                                <li>Identifies identical ledger entries</li>
                                <li>Automatically blocks duplicates</li>
                            </ul>
                            <div style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, background: '#dcfce7', padding: '0.5rem', borderRadius: '4px' }}>
                                👉 Outcome: Eliminates double billing
                            </div>
                        </div>

                        {/* 4 */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>🔒 Tamper-Proof Records</h3>
                            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Scenario:</strong> Bad actor tries modifying historical treatment data.</p>
                            <ul style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                                <li>Records exist on immutable blockchain</li>
                                <li>Changes trigger cryptographic alerts</li>
                                <li>Unauthorized edits are rejected</li>
                            </ul>
                            <div style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, background: '#dcfce7', padding: '0.5rem', borderRadius: '4px' }}>
                                👉 Outcome: Total Data Integrity maintained
                            </div>
                        </div>

                        {/* 5 */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>📊 Automated Audits</h3>
                            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Scenario:</strong> Regulator audits a hospital's operations.</p>
                            <ul style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                                <li>System generates 1-click audit logs</li>
                                <li>Shows 100% transparent history</li>
                                <li>No manual data gathering required</li>
                            </ul>
                            <div style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, background: '#dcfce7', padding: '0.5rem', borderRadius: '4px' }}>
                                👉 Outcome: Efficient regulatory audits
                            </div>
                        </div>

                        {/* 6 */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>🏥 Hospital Monitoring</h3>
                            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Scenario:</strong> Admin tracks operational claim success.</p>
                            <ul style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                                <li>Live Dashboard maps patient stats</li>
                                <li>Displays aggregated AI fraud alerts</li>
                                <li>Reveals internal staff compliance</li>
                            </ul>
                            <div style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, background: '#dcfce7', padding: '0.5rem', borderRadius: '4px' }}>
                                👉 Outcome: Better operational control
                            </div>
                        </div>

                        {/* 7 */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>💼 Insurance Assessment</h3>
                            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Scenario:</strong> Insurer reviews high-risk demographic claims.</p>
                            <ul style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                                <li>AI flags & assigns real-time risk scores</li>
                                <li>Highlights suspicious patterns</li>
                                <li>Pushes complex claims to manual review</li>
                            </ul>
                            <div style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, background: '#dcfce7', padding: '0.5rem', borderRadius: '4px' }}>
                                👉 Outcome: Reduced financial losses
                            </div>
                        </div>

                        {/* 8 */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>🧑 Patient Transparency</h3>
                            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Scenario:</strong> Patient checks status of an unpaid claim.</p>
                            <ul style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                                <li>Dashboard shows live timeline tracker</li>
                                <li>Confirms smart contract approval stage</li>
                                <li>Alerts for any suspicious activity</li>
                            </ul>
                            <div style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, background: '#dcfce7', padding: '0.5rem', borderRadius: '4px' }}>
                                👉 Outcome: Trust and peace of mind
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* One Team Section / Grid */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">One Platform. One Source of Truth. Full Accountability</h2>
                    </div>

                    <div className="grid-3">
                        <div className="image-card">
                            <img src="/hospital.png" alt="Hospital" />
                            <div className="image-card-content">
                                <h4>Hospitals</h4>
                                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Secure patient management</p>
                            </div>
                        </div>
                        <div className="image-card">
                            <img src="/insurance.png" alt="Insurance" />
                            <div className="image-card-content">
                                <h4>Insurance Providers</h4>
                                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Automated claim verification</p>
                            </div>
                        </div>
                        <div className="image-card">
                            <img src="/auditor.png" alt="Audit" />
                            <div className="image-card-content">
                                <h4>Auditors</h4>
                                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Immutable system logs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section id="resources" className="section" style={{ background: 'var(--bg-accent)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Platform Resources</h2>
                        <p className="section-subtitle">Documentation, whitepapers, and APIs for seamless integration.</p>
                    </div>

                    <div className="grid-3">
                        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div className="card-icon" style={{ background: 'var(--primary)', color: 'white' }}><FileText size={24} /></div>
                            <h3 className="card-title">Technical Whitepaper</h3>
                            <p className="card-desc" style={{ flexGrow: 1 }}>Read the comprehensive breakdown of our zero-trust architecture, AI fraud detection models, and blockchain implementation.</p>
                            <button className="btn-outline" style={{ width: '100%', marginTop: '1rem' }}>Download PDF</button>
                        </div>
                        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div className="card-icon" style={{ background: '#3b82f6', color: 'white' }}><Database size={24} /></div>
                            <h3 className="card-title">Integration API Docs</h3>
                            <p className="card-desc" style={{ flexGrow: 1 }}>Connect your existing Hospital Management Systems (HMIS) directly to our tamper-proof secure authentication gateway.</p>
                            <button className="btn-outline" style={{ width: '100%', marginTop: '1rem' }}>View API Reference</button>
                        </div>
                        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div className="card-icon" style={{ background: '#10b981', color: 'white' }}><Shield size={24} /></div>
                            <h3 className="card-title">Compliance Guide</h3>
                            <p className="card-desc" style={{ flexGrow: 1 }}>Ensure your healthcare facility meets data protection regulations using our pre-audited compliance protocols.</p>
                            <button className="btn-outline" style={{ width: '100%', marginTop: '1rem' }}>Read Guide</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="section" style={{ borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div className="container">
                    <h2 className="section-title">Ready to secure healthcare data?</h2>
                    <p className="section-subtitle" style={{ marginBottom: '2rem' }}>Experience the power of Tamper-Proof Self-Auditing Anti-HMO Fraud Software.</p>
                    <Link to="/login" className="btn-primary" style={{ transform: 'scale(1.1)' }}>Get Started</Link>
                </div>
            </section>
        </div>
    );
}
