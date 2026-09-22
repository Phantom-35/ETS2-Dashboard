import { Radio, History } from 'lucide-react';
import { formatTime } from '../utils/timeFormat';

interface HeaderProps {
  isConnected: boolean;
  gameTime: string;
  onHistoryClick: () => void;
}

export const Header = ({ isConnected, gameTime, onHistoryClick }: HeaderProps) => {
  const time = formatTime(gameTime);

  return (
    <div className="border-b border-gray-800/50 pb-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            isConnected
              ? 'bg-green-900/30 border border-green-700/50 text-green-400'
              : 'bg-red-900/30 border border-red-700/50 text-red-400'
          }`}
        >
          <Radio className="w-4 h-4" />
          {isConnected ? 'Verbunden' : 'Getrennt'}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-blue-400">{time}</div>
          <button
            onClick={onHistoryClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg hover:bg-blue-900/50 transition-colors text-blue-400 font-medium text-sm"
          >
            <History className="w-4 h-4" />
            HISTORIE
          </button>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-6xl font-black tracking-tighter glow-text">
          PHANTOM TRANSPORT
        </h1>
        <p className="text-gray-500 text-sm mt-2 tracking-widest uppercase">
          Logistics Terminal
        </p>
      </div>
    </div>
  );
};
