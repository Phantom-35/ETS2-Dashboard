import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  label: string;
  unit?: string;
  warningThreshold?: number;
  dangerThreshold?: number;
  className?: string;
}

export const ProgressBar = ({
  value,
  label,
  unit = '%',
  warningThreshold = 5,
  dangerThreshold = 15,
  className = '',
}: ProgressBarProps) => {
  const safeValue = value || 0;
  const isDanger = safeValue < dangerThreshold;
  const isWarning = safeValue > warningThreshold && !isDanger;

  let barColor = '#3b82f6';
  let textColor = 'text-blue-400';

  if (isDanger) {
    barColor = '#ef4444';
    textColor = 'text-red-400';
  } else if (isWarning) {
    barColor = '#f97316';
    textColor = 'text-orange-500';
  }

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <span className={`text-sm font-bold ${textColor}`}>
          {safeValue.toFixed(1)}
          {unit}
        </span>
      </div>
      <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(safeValue, 100)}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
