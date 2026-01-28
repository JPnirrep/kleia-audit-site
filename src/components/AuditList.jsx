import React from 'react';
import { ExternalLink, Calendar, Search } from 'lucide-react';

const AuditList = ({ audits, onSelectAudit, onNewAudit }) => {
    return (
        <div className="p-5 max-w-5xl mx-auto fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Audit Q.G.</h1>
                    <p className="text-[var(--text-muted)]">Historique des analyses stratégiques</p>
                </div>
                <button
                    onClick={onNewAudit}
                    className="bg-[var(--accent-color)] text-black font-bold py-3 px-6 rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                >
                    <Search size={20} />
                    NOUVEL AUDIT
                </button>
            </div>

            {/* List */}
            <div className="glass-card">
                {audits.length === 0 ? (
                    <div className="text-center p-10 text-[var(--text-muted)]">
                        Aucun audit enregistré. Lancez votre première analyse !
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] text-sm uppercase">
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Cible (URL)</th>
                                    <th className="p-4">Score</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {audits.map((audit) => (
                                    <tr key={audit.id} className="border-b border-[var(--border-color)] hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-white">
                                                <Calendar size={16} className="text-[var(--accent-color)]" />
                                                {audit.date ? new Date(audit.date.seconds * 1000).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-sm text-[var(--accent-color)] opacity-80">{audit.url}</td>
                                        <td className="p-4">
                                            <span className={`font-bold px-2 py-1 rounded text-xs ${audit.score >= 70 ? 'bg-green-500/20 text-green-400' :
                                                    audit.score >= 50 ? 'bg-orange-500/20 text-orange-400' :
                                                        'bg-red-500/20 text-red-400'
                                                }`}>
                                                {audit.score}/100
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => onSelectAudit(audit)}
                                                className="text-white hover:text-[var(--accent-color)] hover:underline flex items-center gap-1 text-sm font-bold transition-colors"
                                            >
                                                VOIR <ExternalLink size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <style>{`
                .fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default AuditList;
