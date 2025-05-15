import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Calculator, ArrowUpDown } from 'lucide-react';

interface StatisticsDisplayProps {
  stats: {
    mean: number;
    mode: number;
    min: number;
    max: number;
    variance: number;
    stdDev: number;
  };
  params: {
    x: number;
    std: number;
    skew: number;
  };
}

const StatisticsDisplay: React.FC<StatisticsDisplayProps> = ({ stats, params }) => {
  const statItems = [
    { 
      name: 'Expected Value',
      value: params.x.toFixed(2),
      icon: <Calculator className="w-4 h-4 text-purple-600" />,
      subtitle: 'Input center (x)'
    },
    { 
      name: 'Actual Mean',
      value: stats.mean.toFixed(2),
      icon: <Calculator className="w-4 h-4 text-blue-600" />,
      subtitle: 'Average of all values'
    },
    { 
      name: 'Mode',
      value: stats.mode,
      icon: <BarChart className="w-4 h-4 text-blue-600" />,
      subtitle: 'Most frequent value'
    },
    { 
      name: 'Range',
      value: `${stats.min} - ${stats.max}`,
      icon: <ArrowUpDown className="w-4 h-4 text-blue-600" />,
      subtitle: 'Min - Max'
    },
    { 
      name: 'Input Std Dev',
      value: params.std.toFixed(2),
      icon: <Calculator className="w-4 h-4 text-purple-600" />,
      subtitle: 'Parameter standard deviation'
    },
    { 
      name: 'Sample Std Dev',
      value: stats.stdDev.toFixed(2),
      icon: <Calculator className="w-4 h-4 text-blue-600" />,
      subtitle: 'Actual standard deviation'
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2" /> Statistics
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <motion.div 
            key={item.name}
            className="bg-gray-50 p-3 rounded-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
          >
            <div className="flex items-center mb-1">
              {item.icon}
              <h3 className="text-sm font-medium text-gray-700 ml-1">{item.name}</h3>
            </div>
            <p className="text-lg font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500">{item.subtitle}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 bg-blue-50 p-3 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-1">About This Distribution</h3>
        <p className="text-xs text-blue-700">
          This is a Gaussian distribution centered at <strong>{params.x.toFixed(1)}</strong> with 
          standard deviation <strong>{params.std.toFixed(1)}</strong> and 
          skew factor <strong>{params.skew.toFixed(1)}</strong>. 
          {params.skew > 0 
            ? ' Positive skew creates a longer right tail.' 
            : params.skew < 0 
              ? ' Negative skew creates a longer left tail.' 
              : ' No skew means the distribution is symmetric.'}
        </p>
      </div>
    </motion.div>
  );
};

export default StatisticsDisplay;