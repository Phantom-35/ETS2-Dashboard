import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Radio, History } from 'lucide-react';
import { formatTime } from '../utils/timeFormat';
export const Header = ({ isConnected, gameTime, onHistoryClick }) => {
    const time = formatTime(gameTime);
    return (_jsxs("div", { className: "border-b border-gray-800/50 pb-6 mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${isConnected
                            ? 'bg-green-900/30 border border-green-700/50 text-green-400'
                            : 'bg-red-900/30 border border-red-700/50 text-red-400'}`, children: [_jsx(Radio, { className: "w-4 h-4" }), isConnected ? 'Verbunden' : 'Getrennt'] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "text-3xl font-bold text-blue-400", children: time }), _jsxs("button", { onClick: onHistoryClick, className: "flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg hover:bg-blue-900/50 transition-colors text-blue-400 font-medium text-sm", children: [_jsx(History, { className: "w-4 h-4" }), "HISTORIE"] })] })] }), _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-6xl font-black tracking-tighter glow-text", children: "PHANTOM TRANSPORT" }), _jsx("p", { className: "text-gray-500 text-sm mt-2 tracking-widest uppercase", children: "Logistics Terminal" })] })] }));
};
