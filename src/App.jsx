import React, { useState, useEffect } from 'react';

function App() {
    const [currentDate, setCurrentDate] = useState('');
    const [globalScore, setGlobalScore] = useState(0);
    const [barsAnimated, setBarsAnimated] = useState(false);

    useEffect(() => {
        // Set Date
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(now.toLocaleDateString('fr-FR', options));

        // Animate Score
        const finalScore = 57; // Weighted Average
        let currentScore = 0;
        const interval = setInterval(() => {
            currentScore++;
            setGlobalScore(currentScore);
            if (currentScore >= finalScore) clearInterval(interval);
        }, 20);

        // Trigger bar animation after mount
        setTimeout(() => {
            setBarsAnimated(true);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const getScoreColor = (score) => {
        if (score < 50) return 'var(--danger-color)';
        if (score < 70) return 'var(--warning-color)';
        return 'var(--success-color)';
    };

    return (
        <div className="p-5 dashboard-container max-w-[1200px] mx-auto grid grid-cols-12 gap-5">

            {/* BUTTON DOWNLOAD */}
            <button className="btn-download no-print" onClick={() => window.print()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                TÉLÉCHARGER LE RAPPORT PDF
            </button>

            {/* HEADER SECTION */}
            <div className="header-section col-span-12 flex justify-between items-center mb-5 pb-5 border-b border-[var(--border-color)]">
                <div>
                    <div className="brand-title text-2xl font-bold tracking-tight">McKINSEY x GOOGLE AUDIT</div>
                    <div className="brand-subtitle text-sm text-[var(--text-muted)]">CIBLE : https://leader-speaker.com/mastermind3</div>
                    <div className="brand-subtitle text-sm text-[var(--text-muted)]">DATE : <span>{currentDate}</span></div>
                </div>
                <div className="global-score-container flex items-center gap-4">
                    <div className="text-right">
                        <div className="font-bold text-sm">SCORE GLOBAL</div>
                        <div className="text-xs text-[var(--text-muted)]">Indice de Performance</div>
                    </div>
                    <div
                        className="score-circle text-3xl font-extrabold flex justify-center items-center w-20 h-20 rounded-full border-4 border-[var(--accent-color)] bg-[rgba(56,189,248,0.1)] shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                        style={{ color: getScoreColor(globalScore) }}
                    >
                        {globalScore}
                    </div>
                </div>
            </div>

            {/* CARD 01: Offre & Unit Economics */}
            <div className="glass-card col-span-12 md:col-span-6">
                <h2 className="text-lg uppercase tracking-wider mb-4 flex items-center gap-2 text-[var(--accent-color)]">
                    01. Offre & Unit Economics
                    <span className="ml-auto text-sm text-[var(--text-muted)]">SCORE: 65/100</span>
                </h2>
                <div className="progress-bar-bg mb-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="progress-bar-fill h-full bg-[var(--accent-color)] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: barsAnimated ? '65%' : '0%' }}
                    ></div>
                </div>

                <h3 className="text-base text-white mt-4 mb-1">Analyse de la "Value Ladder"</h3>
                <p className="text-sm text-[var(--text-muted)] mb-2">L'offre est structurée comme un produit High-Ticket classique (Mastermind 5 mois). Cependant, l'absence d'étagement visible (Downsell/Upsell immédiat) crée un risque binaire : conversion ou abandon.</p>
                <ul className="list-disc pl-5 mb-0 text-sm text-[var(--text-muted)] space-y-1">
                    <li><strong>Gatekeeping Tarifaire :</strong> <span className="tag tag-warning">FRICTION ÉLEVÉE</span> Le prix est caché derrière un appel ("Je veux un RDV"). En 2026, pour du B2B, l'opacité totale filtre trop tôt les prospects qualifiés mais pressés.</li>
                    <li><strong>Positionnement :</strong> Mix "Business" et "Humanisme". Risque de dilution du message. L'offre promet à la fois "conférencier influent" et "écosystème business".</li>
                </ul>

                <h3 className="text-base text-white mt-4 mb-1">Rentabilité & Matrice</h3>
                <div className="metric-row flex justify-between mb-2 text-sm text-[var(--text-muted)]">
                    <span>Perceived Value (Deliverables):</span>
                    <span className="data-point text-[var(--accent-color)] font-mono">ÉLEVÉE (Vidéo, Photos, Branding)</span>
                </div>
                <div className="metric-row flex justify-between mb-2 text-sm text-[var(--text-muted)]">
                    <span>CAC (Coût d'Acquisition Client):</span>
                    <span className="data-point text-[var(--accent-color)] font-mono">INCERTAIN (Funnel long)</span>
                </div>

                <div className="quick-win-box mt-4 p-4 bg-[rgba(16,185,129,0.05)] border-l-4 border-[var(--success-color)]">
                    <span className="quick-win-title block text-[var(--success-color)] font-bold text-xs mb-1">QUICK WINS (&lt; 24H)</span>
                    <p className="text-sm text-[var(--text-muted)] m-0">1. Ajouter une mention "À partir de..." ou "Investissement 4 chiffres" pour qualifier les leads avant l'appel.<br />
                        2. Séparer visuellement les livrables "Hard" (Vidéo, Photos) des livrables "Soft" (Mentorat) pour augmenter la valeur perçue tangible.</p>
                </div>
            </div>

            {/* CARD 02: Sémantique & SEO */}
            <div className="glass-card col-span-12 md:col-span-6">
                <h2 className="text-lg uppercase tracking-wider mb-4 flex items-center gap-2 text-[var(--accent-color)]">
                    02. Sémantique & SEO
                    <span className="ml-auto text-sm text-[var(--text-muted)]">SCORE: 40/100</span>
                </h2>
                <div className="progress-bar-bg mb-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="progress-bar-fill h-full bg-[var(--danger-color)] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: barsAnimated ? '40%' : '0%', background: 'var(--danger-color)' }}
                    ></div>
                </div>

                <h3 className="text-base text-white mt-4 mb-1">Opportunités Manquées (Gap Analysis)</h3>
                <p className="text-sm text-[var(--text-muted)] mb-2">La page est une "Sales Letter" isolée, pauvre en maillage sémantique pour les moteurs de recherche.</p>
                <ul className="list-disc pl-5 mb-0 text-sm text-[var(--text-muted)] space-y-1">
                    <li><strong>Mots-clés manquants :</strong> Pas de ciblage transactionnel sur "Formation conférencier prix", "Coaching prise de parole tarif". Le trafic dépend 100% de l'ads ou de l'emailing.</li>
                    <li><strong>Densité :</strong> Trop de généralités ("Devenir influent", "Impacter des vies"). Manque de preuves factuelles indexables (Chiffres d'affaires générés par les alumni).</li>
                    <li><strong>Title Tag :</strong> Probablement générique ("Le 1er Mastermind..."). Doit inclure "Formation Speaker High-Ticket".</li>
                </ul>

                <div className="quick-win-box mt-4 p-4 bg-[rgba(16,185,129,0.05)] border-l-4 border-[var(--success-color)]">
                    <span className="quick-win-title block text-[var(--success-color)] font-bold text-xs mb-1">QUICK WINS (&lt; 24H)</span>
                    <p className="text-sm text-[var(--text-muted)] m-0">1. Renommer la balise &lt;title&gt; : "Mastermind Conférencier & Business Speaker | Leader Speaker".<br />
                        2. Ajouter une section FAQ (Accordéon) avec Schema Markup JSON-LD pour capturer les questions "Comment devenir conférencier".</p>
                </div>
            </div>

            {/* CARD 03: Neuromarketing & UX */}
            <div className="glass-card col-span-12">
                <h2 className="text-lg uppercase tracking-wider mb-4 flex items-center gap-2 text-[var(--accent-color)]">
                    03. Neuromarketing & UX
                    <span className="ml-auto text-sm text-[var(--text-muted)]">SCORE: 55/100</span>
                </h2>
                <div className="progress-bar-bg mb-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="progress-bar-fill h-full bg-[var(--warning-color)] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: barsAnimated ? '55%' : '0%', background: 'var(--warning-color)' }}
                    ></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="text-base text-white mt-4 mb-1">Analyse Cognitive (Charge Mentale)</h3>
                        <p className="text-sm text-[var(--text-muted)] mb-2">Le "Wall of Text" est oppressant. La règle des 3 secondes (Above the Fold) est menacée par une vidéo sans auto-play contextuel ou un titre trop long.</p>
                        <ul className="list-disc pl-5 mb-0 text-sm text-[var(--text-muted)] space-y-1">
                            <li><strong>Listes "Avant/Après" :</strong> Trop longues (9 points). Le cerveau décroche après 5.</li>
                            <li><strong>Call To Action (CTA) :</strong> "Je veux un RDV avec Vincent". C'est un engagement fort. Il manque un "Micro-commitment" (ex: "Voir le programme détaillé").</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-base text-white mt-4 mb-1">Points de Rupture (Dead Ends)</h3>
                        <p className="text-sm text-[var(--text-muted)] mb-2">Si l'utilisateur n'est pas prêt à prendre RDV, il quitte la page. Aucune capture d'email secondaire (Lead Magnet) visible en "Exit Intent".</p>
                        <p className="text-sm text-[var(--text-muted)]"><span className="tag tag-danger">ERREUR CRITIQUE</span> Le footer indique "Copyright © 2023". En 2026, cela tue instantanément la crédibilité d'un programme "Business".</p>
                    </div>
                </div>

                <div className="quick-win-box mt-4 p-4 bg-[rgba(16,185,129,0.05)] border-l-4 border-[var(--success-color)]">
                    <span className="quick-win-title block text-[var(--success-color)] font-bold text-xs mb-1">QUICK WINS (&lt; 24H)</span>
                    <p className="text-sm text-[var(--text-muted)] m-0">1. <strong>Mettre à jour le Copyright en 2026 immédiatement.</strong><br />
                        2. Raccourcir les listes à puces à 5 items majeurs.<br />
                        3. Ajouter un CTA secondaire "Télécharger la brochure PDF" (contre email) pour ne pas perdre 90% du trafic.</p>
                </div>
            </div>

            {/* CARD 04: Technique & Performance */}
            <div className="glass-card col-span-12 md:col-span-6">
                <h2 className="text-lg uppercase tracking-wider mb-4 flex items-center gap-2 text-[var(--accent-color)]">
                    04. Technique & Performance
                    <span className="ml-auto text-sm text-[var(--text-muted)]">SCORE: 50/100</span>
                </h2>
                <div className="progress-bar-bg mb-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="progress-bar-fill h-full bg-[var(--warning-color)] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: barsAnimated ? '50%' : '0%', background: 'var(--warning-color)' }}
                    ></div>
                </div>

                <h3 className="text-base text-white mt-4 mb-1">Core Web Vitals (Simulation)</h3>
                <div className="metric-row flex justify-between mb-2 text-sm text-[var(--text-muted)]">
                    <span>LCP (Largest Contentful Paint):</span>
                    <span className="tag tag-warning">&gt; 2.5s (Probable)</span>
                </div>
                <div className="metric-row flex justify-between mb-2 text-sm text-[var(--text-muted)]">
                    <span>CLS (Layout Shift):</span>
                    <span className="tag tag-success">Stable (Structure simple)</span>
                </div>

                <h3 className="text-base text-white mt-4 mb-1">Propreté du Code</h3>
                <p className="text-sm text-[var(--text-muted)] mb-2">Détection de balises vidéo HTML5 potentiellement non optimisées ("Your browser doesn't support..."). Risque élevé sur mobile (Safari iOS) si le format n'est pas parfaitement encodé.</p>
                <p className="text-sm text-[var(--text-muted)]">Accessibilité : Contraste texte/fond à vérifier sur les sections sombres.</p>

                <div className="quick-win-box mt-4 p-4 bg-[rgba(16,185,129,0.05)] border-l-4 border-[var(--success-color)]">
                    <span className="quick-win-title block text-[var(--success-color)] font-bold text-xs mb-1">QUICK WINS (&lt; 24H)</span>
                    <p className="text-sm text-[var(--text-muted)] m-0">1. Compresser toutes les images en WebP (Gain estimé : 30% temps de chargement).<br />
                        2. Ajouter `loading="lazy"` sur les iframes et images sous la ligne de flottaison.</p>
                </div>
            </div>

            {/* CARD 05: Réputation & Social Proof */}
            <div className="glass-card col-span-12 md:col-span-6">
                <h2 className="text-lg uppercase tracking-wider mb-4 flex items-center gap-2 text-[var(--accent-color)]">
                    05. Réputation & Social Proof
                    <span className="ml-auto text-sm text-[var(--text-muted)]">SCORE: 75/100</span>
                </h2>
                <div className="progress-bar-bg mb-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="progress-bar-fill h-full bg-[var(--success-color)] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: barsAnimated ? '75%' : '0%', background: 'var(--success-color)' }}
                    ></div>
                </div>

                <h3 className="text-base text-white mt-4 mb-1">Signaux de Confiance</h3>
                <p className="text-sm text-[var(--text-muted)] mb-2">Les profils des intervenants (Éric Blot, Franck Marcheix, Vincent Bosq-Bousquet) sont solides. C'est le point fort de la page.</p>
                <ul className="list-disc pl-5 mb-0 text-sm text-[var(--text-muted)] space-y-1">
                    <li><strong>Autorité :</strong> Mention de "TedX", "Inception Story", "Concept Method". Vocabulaire propriétaire efficace ("Category of One").</li>
                    <li><strong>Preuve Sociale :</strong> La page mentionne une "communauté d'élite" mais manque de visages et de liens LinkedIn vérifiables directement dans le flux de lecture.</li>
                </ul>

                <div className="quick-win-box mt-4 p-4 bg-[rgba(16,185,129,0.05)] border-l-4 border-[var(--success-color)]">
                    <span className="quick-win-title block text-[var(--success-color)] font-bold text-xs mb-1">QUICK WINS (&lt; 24H)</span>
                    <p className="text-sm text-[var(--text-muted)] m-0">1. Intégrer 3 témoignages vidéo natifs (pas de lien YouTube sortant) directement sous le premier appel à l'action.<br />
                        2. Ajouter les logos des entreprises clientes des alumni (ex: "Nos membres ont conférencé chez : Airbus, Google...").</p>
                </div>
            </div>

        </div>
    )
}

export default App
