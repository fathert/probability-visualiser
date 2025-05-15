import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Components
import Header from './components/Header';
import ParameterControls from './components/ParameterControls';
import DistributionChart from './components/DistributionChart';
import StatisticsDisplay from './components/StatisticsDisplay';
import Footer from './components/Footer';

// Utils
import { 
  generateSamples, 
  calculateFrequencies, 
  calculateStatistics,
  calculateTheoreticalProbabilities 
} from './utils/random';

function App() {
  // State for parameters
  const [params, setParams] = useState({
    x: 3.5,
    low: 1,
    high: 5,
    std: 0.7,
    skew: 0.6,
    iterations: 1000
  });

  // Stats and samples
  const [samples, setSamples] = useState<number[]>([]);
  const [frequencies, setFrequencies] = useState<number[]>([]);
  const [statistics, setStatistics] = useState({
    mean: 0,
    mode: 0,
    min: 0,
    max: 0,
    variance: 0,
    stdDev: 0
  });
  const [theoreticalProbs, setTheoreticalProbs] = useState<number[]>([]);
  const [isAutoUpdate, setIsAutoUpdate] = useState(true);

  // Generate samples and update stats
  const generateData = useCallback(() => {
    const newSamples = generateSamples(params.iterations, params);
    const newFrequencies = calculateFrequencies(newSamples, params.low, params.high);
    const newStats = calculateStatistics(newSamples);
    const newTheoreticalProbs = calculateTheoreticalProbabilities(
      params.x, params.low, params.high, params.std, params.skew
    );
    
    setSamples(newSamples);
    setFrequencies(newFrequencies);
    setStatistics(newStats);
    setTheoreticalProbs(newTheoreticalProbs);
  }, [params]);

  // Handle parameter changes
  const handleParamChange = (name: string, value: number) => {
    setParams(prev => {
      // Special handling for low/high to ensure they don't cross
      if (name === 'low' && value >= prev.high) {
        return prev;
      }
      if (name === 'high' && value <= prev.low) {
        return prev;
      }
      
      // Ensure x stays within low-high range
      let newX = prev.x;
      if (name === 'low' && prev.x < value) {
        newX = value;
      } else if (name === 'high' && prev.x > value) {
        newX = value;
      }
      
      const newParams = {
        ...prev,
        [name]: value,
        x: name === 'x' ? value : newX
      };
      
      return newParams;
    });
  };

  // Generate data on initial load
  useEffect(() => {
    generateData();
  }, []);

  // Auto-update when parameters change
  useEffect(() => {
    if (isAutoUpdate) {
      generateData();
    }
  }, [params, isAutoUpdate, generateData]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        
        <motion.div 
          className="grid grid-cols-1 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ParameterControls 
            params={params} 
            onParamChange={handleParamChange} 
            onGenerate={generateData}
            isAutoUpdate={isAutoUpdate}
            onAutoUpdateToggle={() => setIsAutoUpdate(!isAutoUpdate)}
          />
          
          <DistributionChart 
            frequencies={frequencies}
            theoreticalProbabilities={theoreticalProbs}
            sampleSize={params.iterations}
            low={params.low}
            high={params.high}
          />
          
          <StatisticsDisplay 
            stats={statistics}
            params={params}
          />
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;