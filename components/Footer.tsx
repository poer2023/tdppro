
import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { useSettings } from '../store';

const Footer: React.FC = () => {
    const { t } = useSettings();
  return (
    <footer className="w-full py-12 mt-20 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="font-serif text-2xl text-stone-800 dark:text-stone-100 mb-6">Let's connect</h2>
        
        <div className="flex gap-6 mb-8">
          <a href="#" className="p-2 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-full transition-all">
            <Twitter size={20} />
          </a>
          <a href="#" className="p-2 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-full transition-all">
            <Github size={20} />
          </a>
          <a href="#" className="p-2 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-full transition-all">
            <Linkedin size={20} />
          </a>
          <a href="#" className="p-2 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-full transition-all">
            <Mail size={20} />
          </a>
        </div>

        <p className="text-stone-400 text-sm">
          © {new Date().getFullYear()} Lumina Space. {t('Designed with')} React, Tailwind & Caffeine.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
