import { motion, AnimatePresence } from 'framer-motion';
import { X, Fuel, Navigation, Zap } from 'lucide-react';
import { TourReport } from '../types/tour';

interface TourReportModalProps {
  report: TourReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TourReportModal = ({ report, isOpen, onClose }: TourReportModalProps) => {
  if (!report) return null;

  const getBackgroundColor = () => {
    switch (report.ecoRating) {
      case 'green':
        return 'from-green-900/30 to-green-900/10 border-green-700/50';
      case 'yellow':
        return 'from-yellow-900/30 to-yellow-900/10 border-yellow-700/50';
      case 'red':
        return 'from-red-900/30 to-red-900/10 border-red-700/50';
    }
  };

  const getTextColor = () => {
    switch (report.ecoRating) {
      case 'green':
        return 'text-green-400';
      case 'yellow':
        return 'text-yellow-400';
      case 'red':
        return 'text-red-400';
    }
  };

  const getBorderColor = () => {
    switch (report.ecoRating) {
      case 'green':
        return 'border-green-500';
      case 'yellow':
        return 'border-yellow-500';
      case 'red':
        return 'border-red-500';
    }
  };

  const getRatingLabel = () => {
    switch (report.ecoRating) {
      case 'green':
        return 'Sparsam';
      case 'yellow':
        return 'Mittelsparsam';
      case 'red':
        return 'Unwirtschaftlich';
    }
  };

  const getButtonColor = () => {
    switch (report.ecoRating) {
      case 'green':
        return 'bg-green-600 hover:bg-green-700';
      case 'yellow':
        return 'bg-yellow-600 hover:bg-yellow-700';
      case 'red':
        return 'bg-red-600 hover:bg-red-700';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-gradient-to-br ${getBackgroundColor()} border rounded-lg p-8 z-50 shadow-2xl`}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black">Fahrbericht</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div className={`border-l-4 pl-4 ${getBorderColor()}`}>
                <div className="text-gray-400 text-sm uppercase tracking-wider mb-3">
                  Eco-Score
                </div>
                <div className={`text-6xl font-black ${getTextColor()}`}>
                  {report.ecoScore}
                </div>
                <div className={`text-sm font-bold ${getTextColor()} mt-3`}>
                  {getRatingLabel()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className={`border-l-4 ${getBorderColor()} pl-4`}>
                  <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2">
                    <Navigation className="w-3 h-3" />
                    <span>Distanz</span>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {report.distanceDriven.toFixed(1)}
                    <span className="text-blue-400 text-lg ml-1">km</span>
                  </div>
                </div>

                <div className={`border-l-4 ${getBorderColor()} pl-4`}>
                  <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2">
                    <Fuel className="w-3 h-3" />
                    <span>Verbrauch</span>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {report.fuelConsumed.toFixed(1)}
                    <span className="text-blue-400 text-lg ml-1">L</span>
                  </div>
                </div>
              </div>

              <div className={`border-l-4 ${getBorderColor()} pl-4`}>
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Durchschnitt
                </div>
                <div className="text-3xl font-bold text-white">
                  {report.averageConsumption.toFixed(2)}
                  <span className="text-blue-400 text-lg ml-1">L/100km</span>
                </div>
              </div>

              <div className={`border-l-4 ${getBorderColor()} pl-4`}>
                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2">
                  <Zap className="w-3 h-3" />
                  <span>Vollgas-Anteil</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {report.fullThrottlePercentage}
                  <span className="text-blue-400 text-lg ml-1">%</span>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Route
                </div>
                <div className="text-white font-medium">
                  {report.sourceCity} → {report.destinationCity}
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Fracht
                </div>
                <div className="text-white font-medium">
                  {report.cargoName}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${getButtonColor()}`}
            >
              Schließen
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
