import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { TourHistoryEntry } from '../types/tour';

interface HistoryModalProps {
  isOpen: boolean;
  history: TourHistoryEntry[];
  onClose: () => void;
  onClearHistory: () => void;
}

export const HistoryModal = ({ isOpen, history, onClose, onClearHistory }: HistoryModalProps) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'green':
        return 'text-green-400';
      case 'yellow':
        return 'text-yellow-400';
      case 'red':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case 'green':
        return 'Sparsam';
      case 'yellow':
        return 'Mittelsparsam';
      case 'red':
        return 'Unwirtschaftlich';
      default:
        return '-';
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[80vh] bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-800/50 rounded-lg p-8 z-50 shadow-2xl overflow-y-auto"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black">Fahrtenverlauf</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Noch keine Fahrten aufgezeichnet</p>
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {history
                  .slice()
                  .reverse()
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-white font-bold">{entry.cargo}</div>
                          <div className="text-gray-400 text-sm">{entry.date}</div>
                        </div>
                        <div className={`text-xl font-bold ${getRatingColor(entry.rating)}`}>
                          {entry.ecoScore}
                          <span className="text-gray-400 text-sm ml-2">{getRatingLabel(entry.rating)}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Distanz:</span>
                          <span className="text-white ml-2">{entry.distance.toFixed(1)} km</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Verbrauch:</span>
                          <span className="text-white ml-2">{entry.consumption.toFixed(1)} L</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Durchschnitt:</span>
                          <span className="text-white ml-2">
                            {(entry.consumption / entry.distance * 100).toFixed(2)} L/100km
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors"
              >
                Schließen
              </button>
              {history.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Löschen
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
