import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Fuel, Navigation, Zap } from 'lucide-react';
export const TourReportModal = ({ report, isOpen, onClose }) => {
    if (!report)
        return null;
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
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "fixed inset-0 bg-black/60 z-40 backdrop-blur", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose }), _jsxs(motion.div, { className: `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-gradient-to-br ${getBackgroundColor()} border rounded-lg p-8 z-50 shadow-2xl`, initial: { opacity: 0, scale: 0.85, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.85, y: 20 }, transition: { type: 'spring', damping: 25, stiffness: 300 }, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-4xl font-black", children: "Fahrbericht" }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-white/10 rounded-lg transition-colors", children: _jsx(X, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "space-y-6 mb-8", children: [_jsxs("div", { className: `border-l-4 pl-4 ${getBorderColor()}`, children: [_jsx("div", { className: "text-gray-400 text-sm uppercase tracking-wider mb-3", children: "Eco-Score" }), _jsx("div", { className: `text-6xl font-black ${getTextColor()}`, children: report.ecoScore }), _jsx("div", { className: `text-sm font-bold ${getTextColor()} mt-3`, children: getRatingLabel() })] }), _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { className: `border-l-4 ${getBorderColor()} pl-4`, children: [_jsxs("div", { className: "flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2", children: [_jsx(Navigation, { className: "w-3 h-3" }), _jsx("span", { children: "Distanz" })] }), _jsxs("div", { className: "text-3xl font-bold text-white", children: [report.distanceDriven.toFixed(1), _jsx("span", { className: "text-blue-400 text-lg ml-1", children: "km" })] })] }), _jsxs("div", { className: `border-l-4 ${getBorderColor()} pl-4`, children: [_jsxs("div", { className: "flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2", children: [_jsx(Fuel, { className: "w-3 h-3" }), _jsx("span", { children: "Verbrauch" })] }), _jsxs("div", { className: "text-3xl font-bold text-white", children: [report.fuelConsumed.toFixed(1), _jsx("span", { className: "text-blue-400 text-lg ml-1", children: "L" })] })] })] }), _jsxs("div", { className: `border-l-4 ${getBorderColor()} pl-4`, children: [_jsx("div", { className: "text-gray-400 text-xs uppercase tracking-wider mb-2", children: "Durchschnitt" }), _jsxs("div", { className: "text-3xl font-bold text-white", children: [report.averageConsumption.toFixed(2), _jsx("span", { className: "text-blue-400 text-lg ml-1", children: "L/100km" })] })] }), _jsxs("div", { className: `border-l-4 ${getBorderColor()} pl-4`, children: [_jsxs("div", { className: "flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2", children: [_jsx(Zap, { className: "w-3 h-3" }), _jsx("span", { children: "Vollgas-Anteil" })] }), _jsxs("div", { className: "text-3xl font-bold text-white", children: [report.fullThrottlePercentage, _jsx("span", { className: "text-blue-400 text-lg ml-1", children: "%" })] })] }), _jsxs("div", { className: "border-l-4 border-blue-500 pl-4", children: [_jsx("div", { className: "text-gray-400 text-xs uppercase tracking-wider mb-2", children: "Route" }), _jsxs("div", { className: "text-white font-medium", children: [report.sourceCity, " \u2192 ", report.destinationCity] })] }), _jsxs("div", { className: "border-l-4 border-blue-500 pl-4", children: [_jsx("div", { className: "text-gray-400 text-xs uppercase tracking-wider mb-2", children: "Fracht" }), _jsx("div", { className: "text-white font-medium", children: report.cargoName })] })] }), _jsx("button", { onClick: onClose, className: `w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${getButtonColor()}`, children: "Schlie\u00DFen" })] })] })) }));
};
