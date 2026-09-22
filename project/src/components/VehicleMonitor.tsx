import { Wind, AlertTriangle } from 'lucide-react';
import { TelemetryData } from '../types/telemetry';
import { ProgressBar } from './ProgressBar';

interface VehicleMonitorProps {
  data: TelemetryData;
}

export const VehicleMonitor = ({ data }: VehicleMonitorProps) => {
  const truck = data?.truck;
  const trailer = data?.trailer;

  const truckDamage =
    ((truck?.wearEngine || 0) +
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

  return (
    <div className="space-y-6">
      <ProgressBar
        value={fuelPercent}
        label="Kraftstoff"
        unit="%"
        warningThreshold={100}
        dangerThreshold={15}
        className="mb-6"
      />

      <ProgressBar
        value={truckDamagePercent}
        label="LKW-Schaden"
        unit="%"
        warningThreshold={5}
        className="mb-6"
      />

      {trailer?.attached && (
        <ProgressBar
          value={trailerDamagePercent}
          label="Trailer-Schaden"
          unit="%"
          warningThreshold={5}
          className="mb-6"
        />
      )}

      <div className="border-l-4 border-blue-500 pl-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Wind className="w-4 h-4" />
            <span>Luftdruck</span>
          </div>
          <span
            className={`text-xl font-bold ${airPressureWarning ? 'text-red-400' : 'text-blue-400'}`}
          >
            {airPressure.toFixed(1)} psi
          </span>
        </div>
        {airPressureWarning && (
          <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
            <AlertTriangle className="w-3 h-3" />
            <span>Niedriger Druck</span>
          </div>
        )}
      </div>
    </div>
  );
};
