import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, BookOpen, Award, ArrowRight, Star, Users, Zap } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);

  const stats = [
    { label: 'Years Experience', value: '2+', icon: Briefcase },
    { label: 'Projects Completed', value: '10+', icon: Code2 },
    { label: 'Technologies', value: '8+', icon: Zap },
    { label: 'GitHub Repos', value: '20+', icon: Github }
  ];

  const skills = [
    { category: 'Languages', items: ['Python', 'C++', 'C', 'SQL', 'JavaScript'] },
    { category: 'Backend Frameworks', items: ['Django', 'Flask', 'Odoo', 'REST APIs'] },
    { category: 'Frontend & Mobile', items: ['React Native', 'Bootstrap', 'HTML5', 'CSS3', 'JavaScript'] },
    { category: 'Tools & Platforms', items: ['VS Code', 'PyCharm', 'GitHub', 'AWS EC2', 'Git', 'PostgreSQL'] },
    { category: 'Specializations', items: ['Odoo Development', 'Full Stack', 'ERP Systems', 'Web Apps'] }
  ];

  const projects = [
    {
      title: 'Personal Blog',
      desc: 'Full-featured blog application with user authentication, comments, and cloud deployment',
      tech: ['Django', 'Python', 'SQL', 'HTML/CSS'],
      icon: '📝',
      repo: 'https://github.com/abhishekpa8368',
      live: '#'
    },
    {
      title: 'Virtual Gym Trainer',
      desc: 'AI-powered fitness app with pose detection and chatbot for personalized guidance',
      tech: ['Django', 'AI/ML', 'Bootstrap', 'SQLite'],
      icon: '💪',
      repo: 'https://github.com/abhishekpa8368',
      live: '#'
    },
    {
      title: 'E-commerce Dairy Store',
      desc: 'Complete e-commerce platform with shopping cart and secure payment integration',
      tech: ['Django', 'JavaScript', 'SQLite', 'Payment API'],
      icon: '🛒',
      repo: 'https://github.com/abhishekpa8368',
      live: '#'
    },
    {
      title: 'Odoo Library Management',
      desc: 'Custom Odoo module for managing library operations and member tracking',
      tech: ['Odoo', 'Python', 'XML'],
      icon: '📚',
      repo: 'https://github.com/abhishekpa8368',
      live: '#'
    },
    {
      title: 'Webhook Integration Module',
      desc: 'Automated data synchronization between Odoo and external systems',
      tech: ['Odoo', 'Python', 'REST APIs'],
      icon: '🔗',
      repo: 'https://github.com/abhishekpa8368',
      live: '#'
    },
    {
      title: 'Assets Tracker Module',
      desc: 'Asset lifecycle management with tracking, depreciation, and disposal workflows',
      tech: ['Odoo', 'Python', 'XML'],
      icon: '📊',
      repo: 'https://github.com/abhishekpa8368',
      live: '#'
    }
  ];

  const experience = [
    {
      role: 'Jr. Odoo Developer',
      company: 'Technosport',
      period: 'Current',
      location: 'Bangalore',
      description: 'Building ERP solutions and custom Odoo modules'
    },
    {
      role: 'Odoo Trainee',
      company: 'Technians Softech Pvt. Ltd.',
      period: 'Jun 2025 - Jul 2025',
      location: 'Gurgaon',
      description: 'Deployed Odoo modules on AWS instances'
    },
    {
      role: 'Odoo Intern',
      company: 'Akili System Pvt. Ltd.',
      period: 'Apr 2025 - Jun 2025',
      location: 'Noida',
      description: 'Developed Library Management and Document Template systems'
    },
    {
      role: 'Python Intern',
      company: 'CETPA Infotech Pvt. Ltd.',
      period: 'Jan 2024 - Jul 2024',
      location: 'Noida',
      description: 'Full stack Python and Django training'
    }
  ];

  const certifications = [
    'Fullstack Python with React - CETPA Infotech',
    'Python Django - CETPA Infotech',
    'C++ - Udemy',
    'SQL - Udemy',
    'C - Udemy'
  ];

  const interests = ['Cricket 🏏', 'Tech Exploration', 'Web Development', 'Mobile Apps', 'ERP Systems', 'Continuous Learning'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AP
            </div>
            
            <div className="hidden md:flex gap-8">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition duration-300 text-sm font-medium">
                  {item}
                </a>
              ))}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block py-2 hover:text-blue-400 text-sm">
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="text-center md:text-left">
              <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold">
                ✨ Welcome to my portfolio
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Abhishek Pal
              </h1>
              
              <p className="text-2xl md:text-3xl text-purple-300 font-semibold mb-4">
                Full Stack Developer & Odoo Specialist
              </p>

              <p className="text-lg text-slate-300 mb-2">
                🎯 <span className="font-semibold">22 years old</span> from Ghaziabad, currently in Bangalore
              </p>

              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                Passionate engineer exploring multiple technologies. Building scalable web applications with Python, Django, and Odoo. Currently learning React Native. Believer in continuous learning and tech diversity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="https://github.com/abhishekpa8368" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <Github size={20} />
                  GitHub Profile
                </a>
                <a href="https://www.linkedin.com/in/abhishek-pal-a12692260/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition duration-300 flex items-center justify-center gap-2">
                  <Linkedin size={20} />
                  LinkedIn
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                {interests.slice(0, 3).map((interest, idx) => (
                  <span key={idx} className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side - Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-1 shadow-2xl">
                  <img src="./images/profilepoc.jpeg"alt="Abhishek Pal" 
                    className="w-full rounded-3xl object-cover h-96"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="text-blue-400" size={32} />
                </div>
                <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-slate-300">
              <p>
                🎓 <span className="font-semibold text-white">BCA Graduate</span> from Hitech Institute of Engineering & Technology, Ghaziabad (2025)
              </p>
              <p>
                💼 <span className="font-semibold text-white">Jr. Odoo Developer</span> at Technosport, currently building ERP solutions
              </p>
              <p>
                📚 <span className="font-semibold text-white">Continuous Learner</span> exploring React Native and emerging technologies
              </p>
              <p>
                🎯 <span className="font-semibold text-white">My Mission:</span> Become a versatile engineer who masters multiple technologies, not dependent on just one tech stack
              </p>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>
                🏏 <span className="font-semibold text-white">Cricket Enthusiast</span> - I love playing and watching cricket
              </p>
              <p>
                🔧 <span className="font-semibold text-white">Problem Solver</span> - Passionate about writing clean, scalable code
              </p>
              <p>
                🌐 <span className="font-semibold text-white">Full Stack Developer</span> - Expertise in Python, Django, Odoo, and exploring mobile development
              </p>
              <p>
                ✨ <span className="font-semibold text-white">Currently Based:</span> Bangalore, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <Code2 className="text-blue-400" />
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="p-8 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-3xl border border-slate-600/50 hover:border-purple-500/50 transition duration-300 transform hover:scale-105">
                <h3 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  {skillGroup.category}
                </h3>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                      <span className="text-slate-200">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-bold flex items-center gap-3">
              <Briefcase className="text-purple-400" />
              Featured Projects
            </h2>
            <a href="https://github.com/abhishekpa8368?tab=repositories" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 flex items-center gap-2">
              View All Repos <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="group relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-3xl p-6 border border-slate-600/50 hover:border-purple-500/50 transition duration-300 transform hover:scale-105 overflow-hidden cursor-pointer" onClick={() => setExpandedProject(expandedProject === idx ? null : idx)}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{project.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-xs font-semibold text-blue-300 hover:bg-blue-500/30 transition flex items-center justify-center gap-1">
                      <Github size={14} /> Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add More Projects Prompt */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl border border-purple-500/30 text-center">
            <p className="text-lg text-slate-300 mb-4">
              📝 <span className="font-semibold">Ready to add more projects?</span> Visit your GitHub to upload new projects and they'll appear here!
            </p>
            <a href="https://github.com/abhishekpa8368?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition duration-300">
              Visit GitHub Repositories
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <BookOpen className="text-pink-400" />
            Professional Journey
          </h2>

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-8 pb-8 border-l-2 border-purple-500 last:pb-0">
                <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-4 border-slate-900"></div>
                
                <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/50 hover:border-purple-500/50 transition duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-blue-400">{exp.role}</h3>
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-xs text-purple-300 font-semibold">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-purple-300 font-semibold text-lg">{exp.company}</p>
                  <p className="text-slate-400 text-sm mb-3">📍 {exp.location}</p>
                  <p className="text-slate-300">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <Award className="text-yellow-400" />
            Certifications & Achievements
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl border border-slate-600/50 hover:border-yellow-500/50 transition duration-300 flex items-center gap-3 transform hover:scale-105">
                <Star className="text-yellow-400 flex-shrink-0" size={20} />
                <span className="text-slate-200">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Connect & Collaborate</h2>
          <p className="text-slate-300 mb-4 text-lg">
            I'm always open to new opportunities, tech discussions, and collaborations!
          </p>
          <p className="text-slate-400 mb-8">
            Whether it's about Odoo, React Native, or exploring new technologies - let's talk!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a href="mailto:abhishekdhangardr@gmail.com" className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 transform hover:scale-105">
              <Mail size={20} />
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/abhishek-pal-a12692260/" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 transform hover:scale-105">
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a href="https://github.com/abhishekpa8368" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 transform hover:scale-105">
              <Github size={20} />
              GitHub
            </a>
          </div>

          <div className="inline-block px-6 py-3 bg-slate-700/50 border border-slate-600 rounded-full">
            <p className="text-slate-300">📍 Currently in <span className="font-semibold text-blue-400">Bangalore</span> | Open to <span className="font-semibold text-purple-400">Remote Work</span></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-slate-400 border-t border-slate-700">
        <p>© 2025 Abhishek Pal. All rights reserved. | Building the future, one line of code at a time 🚀</p>
      </footer>
    </div>
  );
}