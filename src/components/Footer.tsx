import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-4 text-center text-gray-600 text-sm">
      <div className="flex items-center justify-center">
        <span>Probability Distribution Visualizer</span>
        <a href="https://github.com" className="ml-2 flex items-center hover:text-blue-600 transition-colors" 
           target="_blank" rel="noopener noreferrer">
          <Github className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;