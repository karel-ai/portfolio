import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, Briefcase, Code, Terminal, BrainCircuit, Database } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProjectDetail from './components/ProjectDetail';

const experiences = [
  {
    title: "Cheffe de Projet Junior IA",
    company: "CIRCB",
    period: "2024",
    description: "Déploiement d'un assistant IA clinique avec fine-tuning qLoRA sur LLaMA/Phi-4, pipelines ETL. Gain de temps estimé à 75%."
  },
  {
    title: "Ingénierie IA",
    company: "Aivancity/Craft AI",
    period: "2023 - 2024",
    description: "Conception d'un moteur RAG hybride pour LegalTech et d'un hologramme conversationnel interactif (STT -> LLM -> TTS)."
  },
  {
    title: "Data Analyst",
    company: "Consult-Trends",
    period: "2023",
    description: "Analyse statistique pour l'industrie de la mode, nettoyage de base de données massives et web scraping avancé en Python."
  }
];

const projectData = [
  {
    id: "recidivisme",
    title: "Prédiction de Récidive & Fair-ML",
    tags: ["XGBoost", "Random Forest", "Scikit-Learn", "Ethique AI"],
    description: "Système expert de prédiction sur 1.47M de dossiers judiciaires. Audit de biais racial et implémentation d'un cadre d'équité algorithmique garantissant l'impartialité des décisions via StratifiedKFold.",
    icon: <Database className="w-6 h-6 text-pink-accent" />,
    link: "/project/recidivisme",
    goal: "Détecter les risques de récidive sur 1.47M d'entrées tout en neutralisant les biais systémiques historiques des données judiciaires.",
    problem: "Les modèles de ML classiques amplifient souvent les disparités raciales présentes dans les données d'entraînement.",
    problematique: "Comment maximiser l'équité algorithmique (parité démographique) sans dégrader significativement la performance prédictive (ROC-AUC) ?",
    methods: [
      "Benchmark comparatif : Logistic Regression vs XGBoost vs Random Forest",
      "Feature Engineering avancé sur codes ZIP pour supprimer les proxys géographiques de l'ethnie",
      "Audit de Fair-ML via métriques de parité et égalité des chances",
      "Validation robuste par StratifiedKFold (10 splits) et GridSearchCV pour l'optimisation des hyperparamètres"
    ],
    results: [
      "Random Forest identifié comme le modèle le plus équitable avec un ROC-AUC de 0.82",
      "Taux de Faux Positifs réduit à 3.1% pour les groupes minoritaires",
      "Neutralisation prouvée de l'impact ethnique (impact < 0.4%) dans le score final"
    ],
    codeImg: "/demo-picture/ml_recidive_criminelle_picture/code_ml_recidive_criminelle_1.png",
    interfaceImg: "/demo-picture/ml_recidive_criminelle_picture/interface_ml_recidive_criminelle.png"
  },
  {
    id: "color-trend",
    title: "Color Trend AI Engine",
    tags: ["KMeans", "Playwright", "Backtesting", "Python"],
    description: "Plateforme d'analyse prédictive des tendances mode via Pinterest. Extraction visuelle par Clustering KMeans (n=5) et validation par backtesting robotisé CIELAB ΔE76.",
    icon: <BrainCircuit className="w-6 h-6 text-gold-accent" />,
    link: "/project/color-trend",
    goal: "Transformer des flux d'images Pinterest massifs en signaux chromatiques actionnables pour les directions artistiques et détaillants.",
    problem: "Le délai entre l'émergence d'une tendance visuelle sur les réseaux et sa détection par les marques est souvent trop long.",
    problematique: "Comment mapper des millions d'images (RGB/HSL) vers des nomenclatures marché précises et valider leur récurrence historique ?",
    methods: [
      "Scraping haute fréquence via Playwright (Images HD 564px)",
      "Extraction automatique par Clustering KMeans (n=5 clusters dominants par image)",
      "Pipeline de re-scoring ML intégrant des probabilités de tendance via MLP et SVC",
      "Module de validation par Backtesting basé sur la distance colorimétrique CIELAB ΔE76"
    ],
    results: [
      "Automatisation complète de la détection de pics chromatiques saisonniers",
      "Score de fiabilité supérieur à 88% validé sur les 12 derniers mois de données",
      "Dashboard interactif permettant de visualiser l'évolution des 'Color Families' en temps réel"
    ],
    codeImg: "/demo-picture/color_trend_picture/module_scraping.png",
    interfaceImg: "/demo-picture/color_trend_picture/interface_color_trend_1.png"
  },
  {
    id: "aria-cv",
    title: "Aria CV Coach (RAG)",
    tags: ["Mistral Small", "Sentence-BERT", "RAG", "Python"],
    description: "Agent IA autonome d'optimisation de CV. Utilise un moteur RAG avec Sentence-BERT et Mistral Small pour aligner sémantiquement les profils aux exigences ATS.",
    icon: <Terminal className="w-6 h-6 text-pink-accent" />,
    link: "/project/aria-cv",
    goal: "Maximiser le matching sémantique entre CV et offres d'emploi pour franchir les filtres automatisés (ATS).",
    problem: "La personnalisation manuelle des CV est fastidieuse et manque souvent de précision sémantique face aux algorithmes de tri.",
    problematique: "Comment injecter dynamiquement le contexte d'une fiche de poste (via RAG) dans un profil sans briser la cohérence du parcours professionnel ?",
    methods: [
      "Orchestration LLM via Mistral Small (mistral-small-latest)",
      "Vectorisation sémantique avec Sentence-BERT pour le matching d'offres",
      "Pipeline tripartite : Analyse sémantique -> RAG-Optimisation -> Export structuré",
      "Parsing multi-formats haute précision via BeautifulSoup (Web), PyPDF2 et docx2txt"
    ],
    results: [
      "Réduction du temps de personnalisation de 75%",
      "Calcul d'un score de compatibilité ATS fiable (0-100) en temps réel",
      "Génération automatique de suggestions d'alternatives de carrière basées sur les soft skills"
    ],
    codeImg: "/demo-picture/aria_cv_picture/code_implementation_rag_aria_cv.png",
    interfaceImg: "/demo-picture/aria_cv_picture/interface_aria_cv.png"
  },
  {
    id: "query-builder",
    title: "MCP Data Query Builder",
    tags: ["FastMCP", "SQLite", "Agentic AI", "SQL"],
    description: "Assistant DB intelligent orchestré par Gemini via FastMCP. Permet l'ingestion sécurisée de CSV, la génération assistée de requêtes SQL et des visualisations HTML interactives.",
    icon: <Database className="w-6 h-6 text-gold-accent" />,
    link: "/project/query-builder",
    goal: "Démocratiser l'accès à l'analyse de données complexes par une orchestration d'outils (MCP) assistée par IA.",
    problem: "L'exploration de données brutes est souvent bloquée par la complexité du SQL et des étapes de nettoyage manuel.",
    problematique: "Comment garantir un flux d'ingestion 'read-only' sécurisé tout en automatisant la découverte de schémas et la visualisation ?",
    methods: [
      "Développement d'un serveur FastMCP exposant 9 outils spécialisés (CRUD sécurisé, Viz)",
      "Pipeline ETL automatique : Nettoyage CSV -> Mapping Types -> Chargement SQLite in-memory",
      "Génération dynamique de dashboards HTML interactifs (Chart.js)",
      "Système de prompt-engineering expert pour la traduction de langage naturel en SQL optimisé"
    ],
    results: [
      "Cycle d'exploration de données réduit de quelques heures à quelques minutes",
      "Visualisations professionnelles instantanées sans code manuel",
      "Compatibilité totale avec Gemini CLI pour une orchestration fluide"
    ],
    codeImg: "/demo-picture/query_project_picture/gemini_mcp_config_file.png",
    interfaceImg: "/demo-picture/query_project_picture/gemini_mcp_response.png"
  }
];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage = () => (
  <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col gap-32">
        {/* Hero Section */}
        <section id="about" className="min-h-[70vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-pink-accent font-semibold tracking-wide uppercase mb-4">Hello, je suis</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tighter">
              Karel <span className="text-gradient">Elong</span>
            </h1>
            <h3 className="text-2xl md:text-3xl text-slate-400 font-outfit mb-8 max-w-2xl">
              Data Scientist en Alternance <br />(Mai 2026 - Sept 2028).
            </h3>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
              Étudiante passionnée en Master PGE Intelligence Artificielle & Data Science à Aivancity (Paris-Cachan).
              Je conçois des solutions IA génératives, des modèles prédictifs éthiques et des applications end-to-end.
            </p>

            <div className="flex gap-4">
              <button className="glass glass-hover px-6 py-3 rounded-full flex items-center gap-2 text-white font-medium group">
                <Mail className="w-5 h-5 group-hover:text-pink-accent transition-colors" />
                Me Contacter
              </button>
              <a href="https://github.com/karel-ai" target="_blank" rel="noreferrer" className="glass glass-hover p-3 rounded-full flex items-center justify-center group">
                <Github className="w-5 h-5 group-hover:text-gold-accent transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="glass glass-hover p-3 rounded-full flex items-center justify-center group">
                <Linkedin className="w-5 h-5 group-hover:text-pink-accent transition-colors" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <Briefcase className="w-8 h-8 text-gold-accent" />
              <h2 className="text-3xl font-bold">Expériences</h2>
              <div className="h-px bg-white/10 flex-1 ml-4" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-pink-accent text-sm font-medium mb-3">{exp.period}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                  <h4 className="text-slate-400 font-medium mb-4">{exp.company}</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <Code className="w-8 h-8 text-pink-accent" />
              <h2 className="text-3xl font-bold">Projets Clés</h2>
              <div className="h-px bg-white/10 flex-1 ml-4" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.map((project, idx) => (
                <div key={idx} className="glass group rounded-2xl p-8 flex flex-col justify-between hover:border-pink-accent/50 transition-colors duration-300">
                  <div>
                    <div className="mb-6 bg-dark-bg/50 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link to={project.link} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-pink-accent transition-colors">
                      Voir les détails <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
  </main>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-dark-bg text-slate-300 relative overflow-hidden">
        {/* Background Decorators */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Navigation */}
        <nav className="fixed w-full z-50 glass border-b-0 border-white/5 py-4 top-0">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <Link to="/" className="font-outfit font-bold text-xl tracking-wider text-white">KE.</Link>
            <div className="flex gap-6">
              <a href="/#about" className="hover:text-white transition-colors">À propos</a>
              <a href="/#experience" className="hover:text-white transition-colors">Expérience</a>
              <a href="/#projects" className="hover:text-white transition-colors">Projets</a>
            </div>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {projectData.map(project => (
              <Route 
                key={project.id} 
                path={project.link} 
                element={<ProjectDetail project={project} />} 
              />
            ))}
          </Routes>
        </AnimatePresence>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Karel Elong. Fait avec passion et beaucoup de café.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
