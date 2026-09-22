import { useState, useCallback } from 'react';
import { useTelemetry } from './hooks/useTelemetry';
import { useTourTracking } from './hooks/useTourTracking';
import { Header } from './components/Header';
import { RouteInfo } from './components/RouteInfo';
import { VehicleMonitor } from './components/VehicleMonitor';
import { CargoLogistics } from './components/CargoLogistics';
import { TourReportModal } from './components/TourReportModal';
import { HistoryModal } from './components/HistoryModal';
import { AlertCircle, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTourHistory, clearTourHistory } from './utils/storage';

function App() {
  const { data, isConnected, error } = useTelemetry();
  const { report, showReport, closeReport } = useTourTracking(data);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getTourHistory());

  const handleHistoryClick = useCallback(() => {
    setHistory(getTourHistory());
    setShowHistory(true);
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Wirklich die gesamte Fahrtenverlauf löschen?')) {
      clearTourHistory();
      setHistory([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-[1600px] mx-auto">
        {data && (
          <Header
            isConnected={isConnected}
            gameTime={data.game?.time || ''}
            onHistoryClick={handleHistoryClick}
          />
        )}

        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-700/50 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <div className="font-medium text-red-400">Verbindungsfehler</div>
              <div className="text-sm text-gray-400">{error}</div>
            </div>
          </div>
        )}

        {!data && !error && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Truck className="w-16 h-16 mx-auto text-blue-400 mb-4" />
              </motion.div>
              <p className="text-gray-400">Warte auf Telemetrie-Daten...</p>
            </div>
          </div>
        )}

        {data && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/30 to-gray-900/10 border border-gray-800/50 rounded-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                <h2 className="text-2xl font-bold tracking-tight">Route & Navigation</h2>
              </div>
              <RouteInfo data={data} />
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-900/30 to-gray-900/10 border border-gray-800/50 rounded-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                <h2 className="text-2xl font-bold tracking-tight">Fracht & Logistik</h2>
              </div>
              <CargoLogistics data={data} />
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-900/30 to-gray-900/10 border border-gray-800/50 rounded-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                <h2 className="text-2xl font-bold tracking-tight">Fahrzeugstatus</h2>
              </div>
              <VehicleMonitor data={data} />
            </motion.div>
          </motion.div>
        )}

        <TourReportModal report={report} isOpen={showReport} onClose={closeReport} />
        <HistoryModal
          isOpen={showHistory}
          history={history}
          onClose={() => setShowHistory(false)}
          onClearHistory={handleClearHistory}
        />
      </div>
    </div>
  );
}

export default App;
