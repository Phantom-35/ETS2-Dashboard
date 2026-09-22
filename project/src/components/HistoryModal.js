import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
export const HistoryModal = ({ isOpen, history, onClose, onClearHistory }) => {
    const getRatingColor = (rating) => {
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
    const getRatingLabel = (rating) => {
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
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "fixed inset-0 bg-black/60 z-40 backdrop-blur", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose }), _jsxs(motion.div, { className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[80vh] bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-800/50 rounded-lg p-8 z-50 shadow-2xl overflow-y-auto", initial: { opacity: 0, scale: 0.85, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.85, y: 20 }, transition: { type: 'spring', damping: 25, stiffness: 300 }, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-4xl font-black", children: "Fahrtenverlauf" }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-white/10 rounded-lg transition-colors", children: _jsx(X, { className: "w-6 h-6" }) })] }), history.length === 0 ? (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-400 text-lg", children: "Noch keine Fahrten aufgezeichnet" }) })) : (_jsx("div", { className: "space-y-4 mb-8", children: history
                                .slice()
                                .reverse()
                                .map((entry, index) => (_jsxs("div", { className: "border-l-4 border-blue-500 pl-4 py-3 hover:bg-white/5 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { children: [_jsx("div", { className: "text-white font-bold", children: entry.cargo }), _jsx("div", { className: "text-gray-400 text-sm", children: entry.date })] }), _jsxs("div", { className: `text-xl font-bold ${getRatingColor(entry.rating)}`, children: [entry.ecoScore, _jsx("span", { className: "text-gray-400 text-sm ml-2", children: getRatingLabel(entry.rating) })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Distanz:" }), _jsxs("span", { className: "text-white ml-2", children: [entry.distance.toFixed(1), " km"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Verbrauch:" }), _jsxs("span", { className: "text-white ml-2", children: [entry.consumption.toFixed(1), " L"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Durchschnitt:" }), _jsxs("span", { className: "text-white ml-2", children: [(entry.consumption / entry.distance * 100).toFixed(2), " L/100km"] })] })] })] }, index))) })), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: onClose, className: "flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors", children: "Schlie\u00DFen" }), history.length > 0 && (_jsxs("button", { onClick: onClearHistory, className: "flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-white transition-colors", children: [_jsx(Trash2, { className: "w-4 h-4" }), "L\u00F6schen"] }))] })] })] })) }));
};
