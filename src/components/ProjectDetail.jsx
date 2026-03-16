import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Database, Layout, Target, Lightbulb, Code as CodeIcon, Rocket, AlertCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectDetail = ({ project }) => {
  if (!project) return null;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-bg-sand text-text-anthracite selection:bg-primary-rose/30">
      <div className="max-w-5xl mx-auto">
        <Link 
          to="/projects"
          className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-accent-gold hover:text-text-anthracite transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
          Retour au Laboratoire
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-20"
        >
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-accent-gold/10 pb-12">
            <div className="max-w-2xl">
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-accent-gold font-bold mb-4 block">
                Projet d'Ingénierie IA
              </span>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-accent-gold/5 text-accent-gold rounded-full text-[10px] font-bold uppercase tracking-widest border border-accent-gold/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-text-anthracite text-white px-8 py-4 rounded-full flex items-center gap-3 font-sans uppercase tracking-widest text-xs font-bold hover:scale-105 transition-all shadow-lg"
            >
              <Github className="w-4 h-4" />
              Voir sur GitHub
            </a>
          </header>

          {/* Grid Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="glass rounded-custom p-10 bg-white/40 shadow-sm border-none">
                <div className="flex items-center gap-4 mb-8 text-accent-gold">
                  <Target className="w-6 h-6" />
                  <h2 className="text-2xl font-serif font-bold lowercase italic tracking-tight">Objectif & Problème</h2>
                </div>
                <div className="space-y-6 text-text-anthracite/80 leading-relaxed font-sans">
                  <p className="text-lg font-medium">{project.goal}</p>
                  <div className="p-6 bg-accent-gold/5 border-l-4 border-accent-gold rounded-r-xl">
                    <p className="text-sm italic">
                      <AlertCircle className="w-4 h-4 inline mr-2 -mt-1 opacity-60" />
                      {project.problem}
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-primary-rose/5 border border-primary-rose/10 rounded-custom p-10 flex flex-col justify-center italic text-center">
                <div className="flex justify-center mb-6 text-accent-gold/40">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <p className="text-2xl font-serif text-text-anthracite/90 leading-relaxed">
                  " {project.problematique} "
                </p>
              </section>
            </div>

            <div className="space-y-8">
               <section className="glass rounded-custom p-10 bg-white/40 h-full border-none shadow-sm">
                  <div className="flex items-center gap-4 mb-8 text-accent-gold">
                    <ShieldCheck className="w-6 h-6" />
                    <h2 className="text-xl font-serif font-bold lowercase italic tracking-tight">Méthodes</h2>
                  </div>
                  <ul className="space-y-6">
                    {project.methods.map((method, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-lg bg-accent-gold/10 flex items-center justify-center text-accent-gold text-[10px] font-bold shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-sm font-sans font-medium text-text-anthracite/80 leading-tight">{method}</p>
                      </li>
                    ))}
                  </ul>
               </section>
            </div>
          </div>

          {/* Visuals - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="glass p-6 rounded-custom bg-white/30 border-none shadow-md overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4 text-accent-gold/60">
                <CodeIcon className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Scalpel : Logique Interne</span>
              </div>
              <img 
                src={project.codeImg} 
                alt="Code implementation" 
                className="w-full rounded-2xl shadow-inner border border-accent-gold/5 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="glass p-6 rounded-custom bg-white/30 border-none shadow-md overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4 text-accent-gold/60">
                <Layout className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Interface : Interaction Humaine</span>
              </div>
              <img 
                src={project.interfaceImg} 
                alt="User interface" 
                className="w-full rounded-2xl shadow-inner border border-accent-gold/5"
              />
            </motion.div>
          </div>

          {/* Results Summary */}
          <section className="glass rounded-custom p-12 bg-white/40 shadow-sm relative overflow-hidden border border-accent-gold/10">
            <div className="absolute top-0 right-0 p-12 opacity-5 text-accent-gold">
              <Rocket className="w-32 h-32" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center mb-12">
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-accent-gold font-bold mb-4 block">Impact & Accomplissements</span>
                <h2 className="text-4xl font-serif font-bold text-text-anthracite italic tracking-tight">Symphonie des Résultats</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {project.results.map((result, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ y: -5 }}
                     className="px-8 py-6 bg-accent-gold/5 rounded-2xl border border-accent-gold/10 flex items-center justify-center text-center"
                   >
                      <p className="font-sans text-lg font-medium tracking-wide text-text-anthracite/90 leading-snug">{result}</p>
                   </motion.div>
                 ))}
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
