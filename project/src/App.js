import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("div", { className: "min-h-screen bg-[#0a0a0a] text-white p-8", children: _jsxs("div", { className: "max-w-[1600px] mx-auto", children: [data && (_jsx(Header, { isConnected: isConnected, gameTime: data.game?.time || '', onHistoryClick: handleHistoryClick })), error && (_jsxs("div", { className: "mb-6 bg-red-900/20 border border-red-700/50 rounded-lg p-4 flex items-center gap-3", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-400 flex-shrink-0" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-red-400", children: "Verbindungsfehler" }), _jsx("div", { className: "text-sm text-gray-400", children: error })] })] })), !data && !error && (_jsx("div", { className: "flex items-center justify-center h-96", children: _jsxs("div", { className: "text-center", children: [_jsx(motion.div, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 2, repeat: Infinity }, children: _jsx(Truck, { className: "w-16 h-16 mx-auto text-blue-400 mb-4" }) }), _jsx("p", { className: "text-gray-400", children: "Warte auf Telemetrie-Daten..." })] }) })), data && (_jsxs(motion.div, { className: "space-y-8", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, children: [_jsxs(motion.div, { className: "bg-gradient-to-br from-gray-900/30 to-gray-900/10 border border-gray-800/50 rounded-lg p-8", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "w-1 h-8 bg-blue-500 rounded-full" }), _jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Route & Navigation" })] }), _jsx(RouteInfo, { data: data })] }), _jsxs(motion.div, { className: "bg-gradient-to-br from-gray-900/30 to-gray-900/10 border border-gray-800/50 rounded-lg p-8", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "w-1 h-8 bg-blue-500 rounded-full" }), _jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Fracht & Logistik" })] }), _jsx(CargoLogistics, { data: data })] }), _jsxs(motion.div, { className: "bg-gradient-to-br from-gray-900/30 to-gray-900/10 border border-gray-800/50 rounded-lg p-8", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "w-1 h-8 bg-blue-500 rounded-full" }), _jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Fahrzeugstatus" })] }), _jsx(VehicleMonitor, { data: data })] })] })), _jsx(TourReportModal, { report: report, isOpen: showReport, onClose: closeReport }), _jsx(HistoryModal, { isOpen: showHistory, history: history, onClose: () => setShowHistory(false), onClearHistory: handleClearHistory })] }) }));
}
export default App;
