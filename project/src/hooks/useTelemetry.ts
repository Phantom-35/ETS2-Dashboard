import { useState, useEffect } from 'react';
import { TelemetryData } from '../types/telemetry';

const API_URL = 'http://192.168.178.122:25555/api/ets2/telemetry';
const POLL_INTERVAL = 100;

export const useTelemetry = () => {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTelemetry = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();

        if (isMounted) {
          setData(jsonData);
          setIsConnected(jsonData.game?.connected || false);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setIsConnected(false);
        }
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, POLL_INTERVAL);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, isConnected, error };
};
