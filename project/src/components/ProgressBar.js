import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const ProgressBar = ({ value, label, unit = '%', warningThreshold = 5, dangerThreshold = 15, className = '', }) => {
    const safeValue = value || 0;
    const isDanger = safeValue < dangerThreshold;
    const isWarning = safeValue > warningThreshold && !isDanger;
    let barColor = '#3b82f6';
    let textColor = 'text-blue-400';
    if (isDanger) {
        barColor = '#ef4444';
        textColor = 'text-red-400';
    }
    else if (isWarning) {
        barColor = '#f97316';
        textColor = 'text-orange-500';
    }
    return (_jsxs("div", { className: `${className}`, children: [_jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [_jsx("span", { className: "text-gray-400 text-sm font-medium", children: label }), _jsxs("span", { className: `text-sm font-bold ${textColor}`, children: [safeValue.toFixed(1), unit] })] }), _jsx("div", { className: "h-3 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50", children: _jsx(motion.div, { className: "h-full rounded-full", style: { backgroundColor: barColor }, initial: { width: 0 }, animate: { width: `${Math.min(safeValue, 100)}%` }, transition: { duration: 0.3, ease: 'easeOut' } }) })] }));
};
