import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Layout, Target, AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectDetail = ({ project }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen pt-32 pb-24 px-6 max-w-6xl mx-auto"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-pink-accent hover:text-white transition-colors mb-8 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Retour au portfolio
      </Link>

      <div className="flex flex-col gap-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-pink-accent/5 rounded-full text-xs font-medium text-slate-300 border border-pink-accent/10">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="glass p-8 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4 text-gold-accent">
              <Target className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">But & Problème</h3>
            </div>
            <p className="text-slate-300 mb-4 font-semibold italic text-lg leading-relaxed">
              "{project.problem}"
            </p>
            <p className="text-slate-400">
              {project.goal}
            </p>
          </div>

          <div className="glass p-8 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4 text-pink-accent">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Problématique</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {project.problematique}
            </p>
          </div>
        </div>

        {/* Methods & Results */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4 text-gold-accent">
              <Lightbulb className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Méthodologies</h3>
            </div>
            <ul className="space-y-3">
               {project.methods.map((method, i) => (
                 <li key={i} className="flex items-start gap-2 text-slate-400">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-accent shrink-0" />
                   <span>{method}</span>
                 </li>
               ))}
            </ul>
          </div>

          <div className="glass p-8 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4 text-pink-accent">
              <CheckCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Résultats</h3>
            </div>
            <ul className="space-y-3">
               {project.results.map((result, i) => (
                 <li key={i} className="flex items-start gap-2 text-slate-400">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-accent shrink-0" />
                   <span>{result}</span>
                 </li>
               ))}
            </ul>
          </div>
        </div>

        {/* Visuals */}
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Code Screenshot */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-white/50">
              <Code className="w-6 h-6" />
              <h3 className="text-lg font-medium uppercase tracking-widest">Aperçu du Code</h3>
            </div>
            <div className="glass rounded-xl overflow-hidden border border-white/10 group">
              <img 
                src={project.codeImg} 
                alt="Code Snippet" 
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Interface Screenshot */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-white/50">
              <Layout className="w-6 h-6" />
              <h3 className="text-lg font-medium uppercase tracking-widest">Interface Utilisateur</h3>
            </div>
            <div className="glass rounded-xl overflow-hidden border border-white/10 group">
              <img 
                src={project.interfaceImg} 
                alt="Interface" 
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700Scale"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
