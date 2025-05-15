import React from 'react';
import { motion } from 'framer-motion';
import { LineChart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6 mb-6"
    >
      <div className="flex items-center justify-center">
        <LineChart className="w-8 h-8 text-purple-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">Probability Distribution Visualizer</h1>
      </div>
      <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
        Interactive tool for experimenting with the skewedBiasedRandomInteger function. 
        Adjust parameters and visualize the resulting probability distribution.
      </p>
    </motion.header>
  );
};

export default Header;