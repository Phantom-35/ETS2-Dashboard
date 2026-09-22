import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle } from 'lucide-react';
import { formatTime, calculateTimeRemaining } from '../utils/timeFormat';
export const RouteInfo = ({ data }) => {
    const navigation = data?.navigation;
    const job = data?.job;
    const distance = ((navigation?.estimatedDistance || 0) / 1000).toFixed(0);
    const eta = formatTime(navigation?.estimatedTime || '');
    const remainingTime = calculateTimeRemaining(job?.remainingTime || '');
    const isDeadlineUrgent = parseInt(remainingTime.split(':')[0] || '0') < 1;
    return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "border-l-4 border-blue-500 pl-4", children: [_jsx("div", { className: "text-gray-400 text-xs uppercase tracking-wider mb-2", children: "Distanz" }), _jsxs("div", { className: "text-3xl font-bold text-white", children: [distance, _jsx("span", { className: "text-blue-400 text-xl ml-2", children: "km" })] })] }), _jsxs("div", { className: "border-l-4 border-blue-500 pl-4", children: [_jsx("div", { className: "text-gray-400 text-xs uppercase tracking-wider mb-2", children: "Ankunft (ETA)" }), _jsx("div", { className: "text-3xl font-bold text-white", children: eta })] }), _jsxs("div", { className: `border-l-4 pl-4 ${isDeadlineUrgent ? 'border-red-500' : 'border-blue-500'}`, children: [_jsx("div", { className: "text-gray-400 text-xs uppercase tracking-wider mb-2", children: "Deadline" }), _jsx("div", { className: `text-3xl font-bold ${isDeadlineUrgent ? 'text-red-400' : 'text-white'}`, children: remainingTime }), isDeadlineUrgent && (_jsxs("div", { className: "flex items-center gap-1 mt-2 text-red-400 text-xs", children: [_jsx(AlertTriangle, { className: "w-3 h-3" }), _jsx("span", { children: "Deadline nah" })] }))] })] }) }));
};
