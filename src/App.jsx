import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

import AuditList from './components/AuditList';
import Scanner from './components/Scanner';
import ReportView from './components/ReportView';

function App() {
    // VIEWS: 'list' | 'input' | 'scanning' | 'report'
    const [view, setView] = useState('list');
    const [audits, setAudits] = useState([]);
    const [currentAudit, setCurrentAudit] = useState(null);
    const [targetUrl, setTargetUrl] = useState('');

    // Load History on Mount
    useEffect(() => {
        fetchAudits();
    }, []);

    const fetchAudits = async () => {
        try {
            const q = query(collection(db, "audits"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const loadedAudits = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAudits(loadedAudits);
        } catch (error) {
            console.error("Error fetching audits:", error);
            // Fallback for demo if DB fails/empty
            if (audits.length === 0) {
                setAudits([]);
            }
        }
    };

    const handleStartNewAudit = () => {
        setView('input');
    };

    const handleLaunchScan = (e) => {
        e.preventDefault();
        if (!targetUrl) return;
        setView('scanning');
    };

    const handleScanComplete = async () => {
        // Generate Audit Data (Simulation of backend results)
        const newAuditData = {
            url: targetUrl,
            date: serverTimestamp(),
            score: Math.floor(Math.random() * (85 - 45) + 45), // Random score between 45 and 85
            data: {} // Could store full JSON report here
        };

        try {
            // Save to Firestore
            await addDoc(collection(db, "audits"), newAuditData);

            // Set current View (use local date for immediate display)
            setCurrentAudit({ ...newAuditData, date: { seconds: Date.now() / 1000 } });
            setView('report');

            // Refresh list in background
            fetchAudits();
        } catch (error) {
            console.error("Error saving audit:", error);
            // Allow viewing report even if save fails
            setCurrentAudit({ ...newAuditData, date: { seconds: Date.now() / 1000 } });
            setView('report');
        }
    };

    // Render Logic
    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-200 font-sans selection:bg-cyan-500/30">
            {/* INPUT MODAL */}
            {view === 'input' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="glass-card w-full max-w-lg p-8 relative">
                        <button
                            onClick={() => setView('list')}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-6">Nouvel Audit Stratégique</h2>
                        <form onSubmit={handleLaunchScan}>
                            <label className="block text-sm text-[var(--text-muted)] mb-2">URL Cible</label>
                            <input
                                type="url"
                                required
                                placeholder="https://exemple.com"
                                className="w-full bg-black/30 border border-[var(--border-color)] rounded-lg p-4 text-white focus:border-[var(--accent-color)] outline-none transition-colors mb-6"
                                value={targetUrl}
                                onChange={(e) => setTargetUrl(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full bg-[var(--accent-color)] text-black font-bold py-4 rounded-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                            >
                                LANCER L'ANALYSE
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT */}
            {view === 'list' && (
                <AuditList
                    audits={audits}
                    onNewAudit={handleStartNewAudit}
                    onSelectAudit={(audit) => {
                        setCurrentAudit(audit);
                        setView('report');
                    }}
                />
            )}

            {view === 'scanning' && (
                <Scanner
                    url={targetUrl}
                    onComplete={handleScanComplete}
                />
            )}

            {view === 'report' && (
                <div>
                    {/* Back Button */}
                    <div className="max-w-[1200px] mx-auto pt-4 px-5 no-print">
                        <button
                            onClick={() => setView('list')}
                            className="text-[var(--text-muted)] hover:text-white flex items-center gap-2 transition-colors text-sm font-bold uppercase tracking-wider"
                        >
                            ← Retour au Q.G.
                        </button>
                    </div>
                    <ReportView data={currentAudit} />
                </div>
            )}
        </div>
    );
}

export default App;
