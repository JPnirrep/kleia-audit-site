import React, { useEffect, useState } from 'react';
import { Scan, ShieldCheck, Database, Globe, Lock } from 'lucide-react';

const Scanner = ({ url, onComplete }) => {
    const [step, setStep] = useState(0);
    const [log, setLog] = useState([]);

    const steps = [
        { icon: Globe, text: "Résolution DNS & Handshake...", delay: 800 },
        { icon: Lock, text: "Vérification Certificat SSL...", delay: 1500 },
        { icon: Database, text: "Extraction de la structure DOM...", delay: 2200 },
        { icon: Scan, text: "Analyse Sémantique & Mots-clés...", delay: 3000 },
        { icon: ShieldCheck, text: "Calcul du Score de Confiance...", delay: 3800 },
        { icon: null, text: "Génération du rapport...", delay: 4500 }
    ];

    useEffect(() => {
        let currentStep = 0;

        const runStep = () => {
            if (currentStep >= steps.length) {
                setTimeout(onComplete, 1000);
                return;
            }

            const s = steps[currentStep];
            setStep(currentStep);
            setLog(prev => [...prev, `> [${new Date().toLocaleTimeString()}] ${s.text}`]);

            currentStep++;
            if (currentStep < steps.length) {
                setTimeout(runStep, steps[currentStep].delay - (steps[currentStep - 1]?.delay || 0));
            } else {
                setTimeout(runStep, 800);
            }
        };

        runStep();
    }, []);

    const CurrentIcon = steps[step]?.icon || ShieldCheck;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-white p-5 fade-in">
            <div className="relative mb-8">
                {/* Ping Animation */}
                <div className="absolute inset-0 bg-[var(--accent-color)] rounded-full opacity-20 animate-ping"></div>
                <div className="relative bg-[#0f172a] p-6 rounded-full border-2 border-[var(--accent-color)] shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                    <CurrentIcon size={48} className="text-[var(--accent-color)] animate-pulse" />
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 tracking-widest uppercase">Analyse en cours</h2>
            <p className="text-[var(--text-muted)] mb-8 font-mono">{url}</p>

            {/* Terminal Window */}
            <div className="w-full max-w-md bg-black/50 rounded-lg border border-[var(--border-color)] p-4 font-mono text-xs h-48 overflow-y-auto shadow-inner">
                {log.map((line, i) => (
                    <div key={i} className="mb-1 text-green-400/80 border-l-2 border-transparent hover:border-green-500 pl-2">
                        {line}
                    </div>
                ))}
                <div className="animate-pulse">_</div>
            </div>

            <style>{`
                .fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
};

export default Scanner;
