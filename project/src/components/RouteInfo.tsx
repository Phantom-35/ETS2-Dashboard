import { AlertTriangle } from 'lucide-react';
import { TelemetryData } from '../types/telemetry';
import { formatTime, calculateTimeRemaining } from '../utils/timeFormat';

interface RouteInfoProps {
  data: TelemetryData;
}

export const RouteInfo = ({ data }: RouteInfoProps) => {
  const navigation = data?.navigation;
  const job = data?.job;

  const distance = ((navigation?.estimatedDistance || 0) / 1000).toFixed(0);
  const eta = formatTime(navigation?.estimatedTime || '');
  const remainingTime = calculateTimeRemaining(job?.remainingTime || '');

  const isDeadlineUrgent = parseInt(remainingTime.split(':')[0] || '0') < 1;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
            Distanz
          </div>
          <div className="text-3xl font-bold text-white">
            {distance}
            <span className="text-blue-400 text-xl ml-2">km</span>
          </div>
        </div>

        <div className="border-l-4 border-blue-500 pl-4">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
            Ankunft (ETA)
          </div>
          <div className="text-3xl font-bold text-white">{eta}</div>
        </div>

        <div className={`border-l-4 pl-4 ${isDeadlineUrgent ? 'border-red-500' : 'border-blue-500'}`}>
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
            Deadline
          </div>
          <div
            className={`text-3xl font-bold ${isDeadlineUrgent ? 'text-red-400' : 'text-white'}`}
          >
            {remainingTime}
          </div>
          {isDeadlineUrgent && (
            <div className="flex items-center gap-1 mt-2 text-red-400 text-xs">
              <AlertTriangle className="w-3 h-3" />
              <span>Deadline nah</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
