import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Lightbulb, Code, Rocket, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExperienceDetail = ({ experience }) => {
  if (!experience) return null;

  return (
    <div className="min-h-screen pt-32 pb-12 px-6 bg-bg-sand text-text-anthracite selection:bg-primary-rose/30">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/experience"
          className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-accent-gold hover:text-text-anthracite transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
          Retour aux Archives
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* Header */}
          <header className="border-b border-accent-gold/10 pb-12">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-accent-gold font-bold mb-4 block">
              Étude de Cas Technique
            </span>
            <h1 className="text-5xl font-serif font-bold mb-6 text-text-anthracite leading-tight">
              {experience.title}
            </h1>
            <div className="flex flex-wrap gap-4 font-sans tracking-widest text-[10px] uppercase font-bold text-text-anthracite/60">
              <span className="bg-white/50 px-4 py-2 rounded-full border border-accent-gold/10 shadow-sm">
                {experience.company}
              </span>
              <span className="bg-white/50 px-4 py-2 rounded-full border border-accent-gold/10 shadow-sm">
                {experience.period}
              </span>
            </div>
          </header>

          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Context & Problem */}
            <section className="glass rounded-custom p-10 relative overflow-hidden group border-none shadow-md bg-white/40">
              <div className="flex items-center gap-4 mb-8 text-accent-gold">
                <Target className="w-6 h-6" />
                <h2 className="text-2xl font-serif font-bold lowercase italic tracking-tight">contexte & problème</h2>
              </div>
              <div className="space-y-6 font-sans text-text-anthracite/80 leading-relaxed">
                <p>{experience.details.context}</p>
                <div className="p-5 bg-accent-gold/5 border-l-4 border-accent-gold rounded-r-xl">
                  <p className="text-sm font-medium flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    {experience.details.problem}
                  </p>
                </div>
              </div>
            </section>

            {/* Problematique */}
            <section className="bg-primary-rose/5 border border-primary-rose/10 rounded-custom p-10 flex flex-col justify-center text-center italic">
              <div className="flex justify-center mb-6 text-accent-gold/40">
                <Lightbulb className="w-8 h-8" />
              </div>
              <p className="text-2xl font-serif text-text-anthracite/90 leading-relaxed">
                " {experience.details.problematique} "
              </p>
            </section>
          </div>

          {/* Methodology */}
          <section className="glass rounded-custom p-10 shadow-lg bg-white/60">
            <div className="flex items-center gap-4 mb-10 text-accent-gold">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-2xl font-serif font-bold lowercase italic tracking-tight">méthodologie adoptée</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experience.details.methodology.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 bg-white/40 rounded-2xl border border-accent-gold/5 hover:border-accent-gold/20 transition-all">
                  <div className="w-8 h-8 rounded-full bg-accent-gold text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                    {idx + 1}
                  </div>
                  <p className="text-sm font-sans font-medium text-text-anthracite/80 leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Results */}
          <section className="py-12 px-10 border-y border-accent-gold/10">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <Rocket className="w-8 h-8 text-accent-gold mb-6" />
              <h2 className="text-3xl font-serif font-bold mb-6 italic tracking-tight">résultats synthétisés</h2>
              <p className="text-xl font-sans text-text-anthracite/80 leading-relaxed">
                {experience.details.results}
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Tech Stack */}
            <section className="glass rounded-custom p-10 bg-white/40 border-none shadow-md">
              <div className="flex items-center gap-4 mb-8 text-accent-gold">
                <Code className="w-6 h-6" />
                <h2 className="text-2xl font-serif font-bold lowercase italic tracking-tight">stack technique</h2>
              </div>
              <div className="flex flex-wrap gap-3 font-mono">
                {experience.details.stack.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-accent-gold/5 text-accent-gold rounded-full text-[10px] font-bold uppercase tracking-widest border border-accent-gold/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Perspectives */}
            <section className="bg-text-anthracite text-bg-sand rounded-custom p-10 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Sparkles className="w-20 h-20" />
               </div>
               <h2 className="text-2xl font-serif font-bold lowercase italic tracking-tight mb-8">perspectives d'évolution</h2>
               <ul className="space-y-6 font-sans">
                  {experience.details.perspectives.map((point, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-rose mt-2 shrink-0 shadow-[0_0_10px_#E5B5A3]" />
                      <p className="text-sm opacity-80 leading-relaxed font-inter font-light">{point}</p>
                    </li>
                  ))}
               </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceDetail;
