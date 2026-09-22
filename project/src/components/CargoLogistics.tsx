import { MapPin, DollarSign } from 'lucide-react';
import { TelemetryData } from '../types/telemetry';

interface CargoLogisticsProps {
  data: TelemetryData;
}

export const CargoLogistics = ({ data }: CargoLogisticsProps) => {
  const trailer = data?.trailer;
  const job = data?.job;

  const trailerName = trailer?.name || 'Kein Trailer';
  const trailerAttached = trailer?.attached || false;
  const trailerMass = ((trailer?.mass || 0) / 1000).toFixed(1);
  const sourceCity = job?.sourceCity || '-';
  const destinationCity = job?.destinationCity || '-';
  const income = job?.income || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
            Fracht
          </div>
          <div
            className={`text-2xl font-bold ${trailerAttached ? 'text-white' : 'text-gray-600'}`}
          >
            {trailerAttached ? trailerName : 'Kein Trailer'}
          </div>
        </div>

        {trailerAttached && (
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
              Gewicht
            </div>
            <div className="text-2xl font-bold text-white">
              {trailerMass}
              <span className="text-blue-400 text-lg ml-2">t</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-l-4 border-blue-500 pl-4">
        <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-3">
          <MapPin className="w-4 h-4" />
          <span>Route</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="w-6 h-6 rounded-full bg-green-500/30 border border-green-500 flex items-center justify-center mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="text-white font-bold text-sm">{sourceCity}</div>
          </div>
          <div className="flex-1 h-1 bg-gray-700 rounded-full"></div>
          <div className="text-center">
            <div className="w-6 h-6 rounded-full bg-red-500/30 border border-red-500 flex items-center justify-center mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </div>
            <div className="text-white font-bold text-sm">{destinationCity}</div>
          </div>
        </div>
      </div>

      <div className="border-l-4 border-blue-500 pl-4">
        <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2">
          <DollarSign className="w-4 h-4" />
          <span>Verdienst</span>
        </div>
        <div className="text-3xl font-bold text-green-400">
          €{(income || 0).toLocaleString()}
        </div>
      </div>
    </div>
  );
};
