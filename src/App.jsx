import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, Briefcase, Code, Terminal, BrainCircuit, Database, Copy, Check, ArrowLeft, Sparkles, ShieldCheck, PenTool } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProjectDetail from './components/ProjectDetail';
import ExperienceDetail from './components/ExperienceDetail';
import heroBg from './assets/hero_bg.png';

const experiences = [
  {
    id: "circb",
    title: "Cheffe de Projet Junior IA",
    company: "CIRCB (Centre Chantal Biya)",
    period: "Juin 2025 - Septembre 2025",
    description: "Déploiement de LLMs pour l'interprétation des tests de pharmacorésistance du VIH.",
    details: {
      context: "Le CIRCB est un centre de référence pour le VIH au Cameroun. Les virologues y génèrent manuellement des rapports de résistance complexes, une tâche chronophage.",
      problem: "Le processus manuel est gourmand en ressources et lent face à la charge de patients.",
      problematique: "Comment accélérer la génération de rapports cliniques fiables via l'IA en contexte de ressources matérielles limitées (VRAM 4Go) ?",
      methodology: [
        "Collecte et structuration des données patients (ETL via Python/Docx).",
        "Benchmarking de 5 LLMs (Llama 3, Phi-4, TinyLlama).",
        "Fine-tuning de Phi-4 Mini via qLoRA (1065 itérations).",
        "Optimisation de l'inférence (gestion VRAM/RAM virtuelle).",
        "Développement d'une interface Streamlit."
      ],
      results: "Un prototype fonctionnel validé par les biologistes, capable de générer des interprétations structurées et fidèles au vocabulaire médical du laboratoire.",
      perspectives: [
        "Utilisation de formats de fichiers fixes pour stabiliser l'extraction ETL.",
        "Intégration d'un système RAG pour enrichir les contextes cliniques."
      ],
      stack: ["Python", "Phi-4", "qLoRA", "Streamlit", "Docx", "Pandas"]
    }
  },
  {
    id: "jurisia",
    title: "Ingénieure IA - JurisIA",
    company: "Développement Solution LegalTech",
    period: "Septembre 2025 - Décembre 2025",
    description: "Conception d'une architecture RAG hybride pour l'assistance juridique.",
    details: {
      context: "Le projet s'inscrit dans un paysage d'inflation normative où les professionnels du droit font face à une surabondance d'informations fragmentées.",
      problem: "Difficulté d'accéder à l'information fiable et instabilité des APIs externes (Légifrance).",
      problematique: "Comment garantir une assistance juridique fiable et précise malgré les instabilités techniques des services tiers ?",
      methodology: [
        "Mise en place d'un système RAG hybride : flux 'Live' (API PISTE) + flux 'Local' (ChromaDB).",
        "Stratégie de chunking via RecursiveCharacterTextSplitter.",
        "Génération sans hallucination via Mistral AI.",
        "Intégration Backend FastAPI et Frontend Next.js."
      ],
      results: "Assistant juridique 'Craft AI Legal Assistant' robuste, garantissant une haute résilience opérationnelle et une interface adaptée aux professionnels.",
      perspectives: [
        "Analyse de documents PDF personnels pour comparaison légale.",
        "Extension à la jurisprudence (Open Data Cour de Cassation)."
      ],
      stack: ["Next.js", "FastAPI", "Mistral AI", "ChromaDB", "SQLite", "Python"]
    }
  },
  {
    id: "bella",
    title: "Ingénieure IA - Project Bella",
    company: "Développement Assistant Vocal",
    period: "Septembre 2024 - Avril 2025",
    description: "Assistant vocal intelligent pour briser l'isolement social des enfants.",
    details: {
      context: "L'isolement des enfants peut nuire à leur développement émotionnel et social.",
      problem: "Manque d'engagement et de compagnon interactif simple pour les plus jeunes.",
      problematique: "Comment créer un compagnon vocal empathique et réactif capable d'interactions naturelles ?",
      methodology: [
        "Architecture modulaire associant STT, LLM et TTS.",
        "Intégration de Llama 3.2 via Ollama pour la logique conversationnelle.",
        "Optimisation de la latence entre la parole et la réponse.",
        "Fallback sur modèles plus légers pour la fluidité."
      ],
      results: "Prototype fonctionnel capable de tenir des conversations suivies et engageantes.",
      perspectives: [
        "Intégration de la reconnaissance d'émotions vocales.",
        "Mode 'Apprentissage' interactif (quizz, histoires)."
      ],
      stack: ["Python", "Ollama", "Llama 3.2", "Google Speech API", "Pyttsx3"]
    }
  },
  {
    id: "consult-trends",
    title: "Stagiaire Data analyst",
    company: "Consult-Trends",
    period: "Mai 2024 - Juillet 2024",
    description: "Surveillance technologique et analyse de tendances via le scraping.",
    details: {
      context: "Dans un marché saturé d'informations, la veille stratégique est cruciale pour anticiper les tendances émergentes.",
      problem: "Le volume massif de données non structurées rend la veille manuelle impossible.",
      problematique: "Comment automatiser la capture et la classification des signaux faibles pour l'industrie de la mode ?",
      methodology: [
        "Développement de scrapers ciblés (BeautifulSoup/Selenium).",
        "Nettoyage et structuration des données textuelles.",
        "Analyse de sentiments et classification de tendances.",
        "Visualisation dynamique des insights via Dash."
      ],
      results: "Plateforme Color Trend capable d'identifier les variations de tendances en temps réel avec des tableaux de bord interactifs.",
      perspectives: [
        "Intégration de modèles NLP avancés pour la détection de thèmes.",
        "Scraping multi-sources incluant les réseaux sociaux (Instagram/TikTok)."
      ],
      stack: ["Python", "BeautifulSoup", "Pandas", "Dash", "Plotly"]
    }
  }
];

const projectData = [
  {
    id: "recidivisme",
    title: "Prédiction de Récidive & Fair-ML",
    githubUrl: "https://github.com/karel-ai/recidivism-project",
    tags: ["XGBoost", "Random Forest", "Scikit-Learn", "Ethique AI"],
    description: "Système expert de prédiction sur 1.47M de dossiers judiciaires. Audit de biais racial et implémentation d'un cadre d'équité algorithmique.",
    icon: <Database className="w-6 h-6 text-accent-gold" />,
    link: "/project/recidivisme",
    goal: "Détecter les risques de récidive sur 1.47M d'entrées tout en neutralisant les biais systémiques historiques des données judiciaires.",
    problem: "Les modèles de ML classiques amplifient souvent les disparités raciales présentes dans les données d'entraînement.",
    problematique: "Comment maximiser l'équité algorithmique sans dégrader significativement la performance prédictive ?",
    methods: [
      "Benchmark comparatif : Logistic Regression vs XGBoost vs Random Forest",
      "Feature Engineering avancé sur codes ZIP",
      "Audit de Fair-ML via métriques de parité",
      "Validation robuste par StratifiedKFold"
    ],
    results: [
      "Random Forest identifié comme le modèle le plus équitable (ROC-AUC 0.82)",
      "Taux de Faux Positifs réduit à 3.1% pour les groupes minoritaires",
      "Neutralisation prouvée de l'impact ethnique (< 0.4%)"
    ],
    codeImg: "/demo-picture/ml_recidive_criminelle_picture/code_ml_recidive_criminelle_1.png",
    interfaceImg: "/demo-picture/ml_recidive_criminelle_picture/interface_ml_recidive_criminelle.png"
  },
  {
    id: "color-trend",
    title: "Color Trend AI Engine",
    githubUrl: "https://github.com/karel-ai/Color-trend-project",
    tags: ["KMeans", "Playwright", "Backtesting", "Python"],
    description: "Plateforme d'analyse prédictive des tendances mode via Pinterest. Extraction visuelle par Clustering KMeans.",
    icon: <BrainCircuit className="w-6 h-6 text-accent-gold" />,
    link: "/project/color-trend",
    goal: "Transformer des flux d'images Pinterest massifs en signaux chromatiques actionnables.",
    problem: "Le délai entre l'émergence d'une tendance visuelle et sa détection est trop long.",
    problematique: "Comment mapper des millions d'images vers des nomenclatures marché précises ?",
    methods: [
      "Scraping haute fréquence via Playwright",
      "Extraction automatique par Clustering KMeans",
      "Pipeline de re-scoring ML",
      "Module de validation par Backtesting"
    ],
    results: [
      "Automatisation de la détection de pics chromatiques",
      "Score de fiabilité supérieur à 88%",
      "Dashboard interactif temps réel"
    ],
    codeImg: "/demo-picture/color_trend_picture/module_scraping.png",
    interfaceImg: "/demo-picture/color_trend_picture/interface_color_trend_1.png"
  },
  {
    id: "aria-cv",
    title: "Aria CV Coach (RAG)",
    githubUrl: "https://github.com/karel-ai/aria_cv_coach",
    tags: ["Mistral Small", "Sentence-BERT", "RAG", "Python"],
    description: "Agent IA autonome d'optimisation de CV via RAG.",
    icon: <Terminal className="w-6 h-6 text-accent-gold" />,
    link: "/project/aria-cv",
    goal: "Maximiser le matching sémantique entre CV et offres d'emploi.",
    problem: "La personnalisation manuelle des CV est fastidieuse et manque de précision sémantique.",
    problematique: "Comment injecter dynamiquement le contexte d'une fiche de poste sans briser la cohérence du profil ?",
    methods: [
      "Orchestration LLM via Mistral Small",
      "Vectorisation sémantique avec Sentence-BERT",
      "Pipeline tripartite : Analyse -> RAG -> Export",
      "Parsing multi-formats haute précision"
    ],
    results: [
      "Réduction du temps de personnalisation de 75%",
      "Score de compatibilité ATS en temps réel",
      "Suggestions d'alternatives de carrière"
    ],
    codeImg: "/demo-picture/aria_cv_picture/code_implementation_rag_aria_cv.png",
    interfaceImg: "/demo-picture/aria_cv_picture/interface_aria_cv.png"
  },
  {
    id: "query-builder",
    title: "MCP Data Query Builder",
    githubUrl: "https://github.com/leojeulinmerville/MCP/tree/karel-ai-project-b",
    tags: ["FastMCP", "SQLite", "Agentic AI", "SQL"],
    description: "Assistant DB intelligent orchestré par Gemini via FastMCP.",
    icon: <Database className="w-6 h-6 text-accent-gold" />,
    link: "/project/query-builder",
    goal: "Démocratiser l'accès à l'analyse de données complexes par orchestration d'outils (MCP).",
    problem: "L'exploration de données est bloquée par la complexité du SQL.",
    problematique: "Comment garantir un flux d'ingestion sécurisé tout en automatisant la découverte de schémas ?",
    methods: [
      "Serveur FastMCP exposant 9 outils spécialisés",
      "Pipeline ETL automatique SQLite in-memory",
      "Génération dynamique de dashboards HTML",
      "Traduction langage naturel en SQL optimisé"
    ],
    results: [
      "Cycle d'exploration réduit à quelques minutes",
      "Visualisations professionnelles instantanées",
      "Compatibilité totale avec Gemini CLI"
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

const Navbar = () => (
  <nav className="fixed w-full z-50 bg-bg-sand/80 backdrop-blur-md border-b border-accent-gold/10 py-4 top-0">
    <div className="max-w-6xl mx-auto px-6 flex justify-between items-center font-serif">
      <Link to="/" className="text-2xl font-bold tracking-widest text-text-anthracite">K.E</Link>
      <div className="flex gap-8 text-sm uppercase tracking-widest font-sans font-medium">
        <Link to="/" className="hover:text-accent-gold transition-colors">À propos</Link>
        <Link to="/experience" className="hover:text-accent-gold transition-colors">Expérience</Link>
        <Link to="/projects" className="hover:text-accent-gold transition-colors">Projets</Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="border-t border-accent-gold/10 py-12 text-center text-text-anthracite/60 bg-bg-sand">
    <div className="max-w-4xl mx-auto px-6">
      <h4 className="font-serif text-xl mb-4 text-accent-gold">IAngénieure® Architecte Visionnaire</h4>
      <p className="text-sm font-sans tracking-wide">© {new Date().getFullYear()} Karel Elong. Allier la sagesse de la tradition à l'innovation éthique.</p>
    </div>
  </footer>
);

const AboutPage = () => {
  const [copied, setCopied] = useState(false);

  return (
    <main className="relative bg-bg-sand">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Signature Library Interior"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-accent-gold font-bold mb-4 block">
            Bâtir pour demain, avec les leçons d'hier
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-text-anthracite mb-6 leading-tight">
            Karel Elong
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-text-anthracite/80 italic mb-12 border-y border-accent-gold/20 py-6 inline-block">
            "Ordonner le chaos pour l'excellence éthique et technique"
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center font-sans tracking-widest uppercase text-xs">
            <Link to="/experience" className="bg-accent-gold text-white px-8 py-4 rounded-full hover:bg-accent-gold/90 transition-all shadow-lg hover:shadow-accent-gold/20">
              Explorer les Expériences
            </Link>
            <Link to="/projects" className="border border-accent-gold/30 text-accent-gold px-8 py-4 rounded-full hover:bg-accent-gold/5 transition-all">
              Découvrir les Projets
            </Link>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-accent-gold animate-bounce">
          <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Scroll</span>
          <div className="w-px h-10 bg-accent-gold/40" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif mb-8 leading-tight">
            Fusionner la sagesse du passé <br />
            <span className="text-accent-gold">et la puissance du futur.</span>
          </h2>
          <div className="space-y-6 text-lg text-text-anthracite/80 leading-relaxed font-sans text-justify">
            <p className="border-l-4 border-accent-gold/20 pl-6 italic mb-10">
              "Dans le flux incessant des données, mon rôle est d'ordonner le chaos. Je ne construis pas seulement des modèles ; je bâtis des architectures transparentes où la performance technologique s'aligne sur l'éthique humaine."
            </p>
            <p>
              Actuellement en 3e année du Programme Grande École à <strong>aivancity</strong>, je me forme pour devenir l'interface vitale entre l'innovation de rupture et les défis sociétaux de demain. Mon profil hybride combine une expertise pointue en Data Science, une vision Business Management et une conscience aiguë de l'Éthique de l'IA, faisant de moi une <strong>IAngénieure®</strong> polyvalente.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {[
            { title: "Ingénierie de Haute Précision", desc: "Spécialisée en IA Générative, je maîtrise la conception d'architectures RAG, le déploiement d'Agents Autonomes et le Fine-tuning de LLMs. De l'ETL au déploiement, je livre des solutions robustes.", icon: <ShieldCheck className="text-accent-gold" /> },
            { title: "Éthique Appliquée & Transparence", desc: "Pour moi, un modèle n'est performant que s'il est juste. J'utilise mon expertise pour l'audit de biais algorithmiques et la création de Blind Models, garantissant une IA explicable.", icon: <Sparkles className="text-accent-gold" /> },
            { title: "Stratégie en Univers VUCA", desc: "Formée à piloter l'innovation dans l'incertitude, je connecte la complexité de la science des données aux réalités concrètes des métiers (Marketing, Finance, Stratégie).", icon: <PenTool className="text-accent-gold" /> }
          ].map((pilier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-custom flex gap-6 group hover:translate-x-2 transition-transform"
            >
              <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center shrink-0">
                {pilier.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 font-serif">{pilier.title}</h3>
                <p className="text-sm text-text-anthracite/70 font-sans">{pilier.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-24 bg-bg-sand border-t border-accent-gold/5">
        <div className="max-w-4xl mx-auto px-6 glass p-12 rounded-custom text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Mail className="w-32 h-32" />
          </div>
          <h2 className="text-3xl font-serif mb-8">Bâtissons l'excellence ensemble.</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => {
                const email = "karel.elong@aivancity.education";
                navigator.clipboard.writeText(email);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="bg-accent-gold text-white px-8 py-3 rounded-full flex items-center gap-3 font-medium transition-all hover:scale-105"
            >
              {copied ? <Check className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
              {copied ? "Copié !" : "karel.elong@aivancity.education"}
            </button>
            <a href="https://github.com/karel-ai" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-accent-gold hover:text-text-anthracite transition-colors font-bold uppercase tracking-widest text-xs border-b border-accent-gold/30">
              <Github className="w-5 h-5" /> GitHub Profile
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

const ExperiencePage = () => (
  <main className="bg-bg-sand pt-32 pb-24 px-6 min-h-screen">
    <div className="max-w-6xl mx-auto">
      <div className="mb-20 text-center max-w-4xl mx-auto">
        <span className="font-sans text-xs tracking-[0.5em] uppercase text-accent-gold font-bold mb-4 block">Chroniques d'une IAgénieure®</span>
        <h1 className="text-5xl font-serif font-bold text-text-anthracite mb-8">L'Expérience du Réel</h1>
        <p className="text-lg text-text-anthracite/70 font-sans leading-relaxed text-justify border-l-4 border-accent-gold/10 pl-8">
          L'expertise ne vaut que par son application au monde réel. Dans mes différentes expériences, mon rôle a toujours été d'être l'ancre au milieu de la transition vers l'industrie 4.0. Vous trouverez ici le détail de mes interventions où j'ai allié performance technique et vision éthique pour répondre aux défis stratégiques des organisations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-custom p-10 flex flex-col justify-between group hover:border-accent-gold/40 transition-all shadow-sm"
          >
            <div>
              <div className="flex justify-between items-start mb-6 font-serif">
                <span className="text-accent-gold font-bold text-sm tracking-widest uppercase">{exp.period}</span>
                <span className="bg-primary-rose/10 text-accent-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-accent-gold/10">{exp.company}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif text-text-anthracite">{exp.title}</h3>
              <p className="text-text-anthracite/70 font-sans leading-relaxed mb-8">{exp.description}</p>
            </div>
            <Link
              to={`/experience/${exp.id}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-gold hover:text-text-anthracite transition-colors group/link"
            >
              Consulter l'archive technique <ArrowLeft className="w-4 h-4 rotate-180 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </main>
);

const ProjectsPage = () => (
  <main className="bg-bg-sand pt-32 pb-24 px-6 min-h-screen">
    <div className="max-w-6xl mx-auto">
      <div className="mb-20">
        <div className="flex items-center gap-6 mb-8">
          <h1 className="text-5xl font-serif font-bold text-text-anthracite">Laboratoires d'Innovation</h1>
          <div className="h-px bg-accent-gold/20 flex-1" />
        </div>
        <p className="text-lg text-text-anthracite/70 font-sans leading-relaxed max-w-4xl border-l-4 border-accent-gold/20 pl-8 text-justify">
          Pour moi, l’IA ne se pense pas uniquement, elle se bâtit. Je suis convaincue que la maîtrise naît de la confrontation permanente au réel et à la complexité. Cette section regroupe mes explorations techniques, aussi bien académiques que personnelles, conçues comme des laboratoires où j’ordonne le chaos pour extraire de la transparence et de la performance. Chaque projet est une pierre angulaire de mon ascension vers une ingénierie d'excellence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-text-anthracite">
        {projectData.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-custom p-8 hover:shadow-xl transition-all border border-accent-gold/5 flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 bg-accent-gold/5 rounded-2xl flex items-center justify-center mb-8">
                {project.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">{project.title}</h3>
              <p className="text-sm font-sans text-text-anthracite/70 leading-relaxed mb-8 h-20 overflow-hidden line-clamp-3">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-accent-gold/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent-gold/80 border border-accent-gold/10">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-accent-gold/5 pt-6">
                <Link to={project.link} className="text-xs font-bold uppercase tracking-[0.2em] text-accent-gold hover:text-text-anthracite transition-colors">
                  Détails
                </Link>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-text-anthracite/40 hover:text-accent-gold transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </main>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-bg-sand selection:bg-primary-rose/30 relative">
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            {projectData.map(project => (
              <Route key={project.id} path={project.link} element={<ProjectDetail project={project} />} />
            ))}
            {experiences.map(exp => (
              <Route key={exp.id} path={`/experience/${exp.id}`} element={<ExperienceDetail experience={exp} />} />
            ))}
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
