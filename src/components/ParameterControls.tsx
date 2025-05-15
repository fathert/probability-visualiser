import React from 'react';
import { motion } from 'framer-motion';
import { Settings, RefreshCw } from 'lucide-react';

interface ParameterControlsProps {
  params: {
    x: number;
    low: number;
    high: number;
    std: number;
    skew: number;
    iterations: number;
  };
  onParamChange: (name: string, value: number) => void;
  onGenerate: () => void;
  isAutoUpdate: boolean;
  onAutoUpdateToggle: () => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  params,
  onParamChange,
  onGenerate,
  isAutoUpdate,
  onAutoUpdateToggle
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const numValue = type === 'range' ? parseFloat(value) : parseInt(value, 10);
    onParamChange(name, numValue);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Settings className="w-5 h-5 mr-2" /> Parameters
        </h2>
        <div className="flex items-center">
          <label className="mr-4 text-sm text-gray-600 flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAutoUpdate}
              onChange={onAutoUpdateToggle}
              className="mr-2 accent-purple-600"
            />
            Auto-update
          </label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium"
            onClick={onGenerate}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Generate
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Center (x): {params.x.toFixed(1)}</label>
              <span className="text-xs text-gray-500">{params.x.toFixed(1)}</span>
            </div>
            <input
              type="range"
              name="x"
              min={params.low}
              max={params.high}
              step={0.1}
              value={params.x}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Standard Deviation (std): {params.std.toFixed(1)}</label>
              <span className="text-xs text-gray-500">{params.std.toFixed(1)}</span>
            </div>
            <input
              type="range"
              name="std"
              min={0.1}
              max={3}
              step={0.1}
              value={params.std}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Skew: {params.skew.toFixed(1)}</label>
              <span className="text-xs text-gray-500">{params.skew.toFixed(1)}</span>
            </div>
            <input
              type="range"
              name="skew"
              min={-2}
              max={2}
              step={0.1}
              value={params.skew}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Minimum (low): {params.low}</label>
              <span className="text-xs text-gray-500">{params.low}</span>
            </div>
            <input
              type="range"
              name="low"
              min={1}
              max={params.high - 1}
              step={1}
              value={params.low}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Maximum (high): {params.high}</label>
              <span className="text-xs text-gray-500">{params.high}</span>
            </div>
            <input
              type="range"
              name="high"
              min={params.low + 1}
              max={20}
              step={1}
              value={params.high}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Iterations: {params.iterations}</label>
              <span className="text-xs text-gray-500">{params.iterations}</span>
            </div>
            <input
              type="range"
              name="iterations"
              min={100}
              max={10000}
              step={100}
              value={params.iterations}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ParameterControls;