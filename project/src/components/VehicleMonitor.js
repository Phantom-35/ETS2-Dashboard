import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Wind, AlertTriangle } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
export const VehicleMonitor = ({ data }) => {
    const truck = data?.truck;
    const trailer = data?.trailer;
    const truckDamage = ((truck?.wearEngine || 0) +
        (truck?.wearTransmission || 0) +
        (truck?.wearCabin || 0) +
        (truck?.wearChassis || 0)) /
        4;
    const truckDamagePercent = truckDamage * 100;
    const trailerDamagePercent = (trailer?.wear || 0) * 100;
    const fuelPercent = truck?.fuelCapacity
        ? ((truck.fuel / truck.fuelCapacity) * 100)
        : 0;
    const airPressure = truck?.airPressure || 0;
    const airPressureWarning = truck?.airPressureWarningOn || false;
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(ProgressBar, { value: fuelPercent, label: "Kraftstoff", unit: "%", warningThreshold: 100, dangerThreshold: 15, className: "mb-6" }), _jsx(ProgressBar, { value: truckDamagePercent, label: "LKW-Schaden", unit: "%", warningThreshold: 5, className: "mb-6" }), trailer?.attached && (_jsx(ProgressBar, { value: trailerDamagePercent, label: "Trailer-Schaden", unit: "%", warningThreshold: 5, className: "mb-6" })), _jsxs("div", { className: "border-l-4 border-blue-500 pl-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2 text-gray-400 text-sm", children: [_jsx(Wind, { className: "w-4 h-4" }), _jsx("span", { children: "Luftdruck" })] }), _jsxs("span", { className: `text-xl font-bold ${airPressureWarning ? 'text-red-400' : 'text-blue-400'}`, children: [airPressure.toFixed(1), " psi"] })] }), airPressureWarning && (_jsxs("div", { className: "flex items-center gap-2 mt-2 text-red-400 text-xs", children: [_jsx(AlertTriangle, { className: "w-3 h-3" }), _jsx("span", { children: "Niedriger Druck" })] }))] })] }));
};
