import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { BarChart2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DistributionChartProps {
  frequencies: number[];
  theoreticalProbabilities: number[];
  sampleSize: number;
  low: number;
  high: number;
}

const DistributionChart: React.FC<DistributionChartProps> = ({
  frequencies,
  theoreticalProbabilities,
  sampleSize,
  low,
  high
}) => {
  const normalizedFrequencies = useMemo(() => {
    return frequencies.map(freq => freq / sampleSize);
  }, [frequencies, sampleSize]);

  const labels = useMemo(() => {
    return Array.from({ length: high - low + 1 }, (_, i) => (low + i).toString());
  }, [low, high]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Observed Probability',
        data: normalizedFrequencies,
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
      {
        label: 'Theoretical Probability',
        data: theoreticalProbabilities,
        backgroundColor: 'rgba(168, 85, 247, 0.4)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
        type: 'bar' as const,
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const count = context.datasetIndex === 0 
              ? Math.round(value * sampleSize) 
              : Math.round(value * sampleSize);
            const percentage = (value * 100).toFixed(2);
            return `${label}: ${percentage}% (Count: ${count})`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Probability',
        },
        ticks: {
          format: {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Value',
        }
      }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <BarChart2 className="w-5 h-5 mr-2" /> Distribution
      </h2>
      
      <div className="h-[400px]">
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Sample size: {sampleSize} iterations
      </div>
    </motion.div>
  );
};

export default DistributionChart;