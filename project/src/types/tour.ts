export interface TourData {
  startOdometer: number;
  startFuel: number;
  lastFuelLevel: number;
  totalConsumed: number;
  throttleValues: number[];
  startTime: number;
  cargoName: string;
  sourceCity: string;
  destinationCity: string;
}

export interface TourReport {
  distanceDriven: number;
  fuelConsumed: number;
  averageConsumption: number;
  ecoScore: number;
  ecoRating: 'green' | 'yellow' | 'red';
  fullThrottlePercentage: number;
  cargoName: string;
  sourceCity: string;
  destinationCity: string;
  timestamp: number;
}

export interface TourHistoryEntry {
  date: string;
  cargo: string;
  distance: number;
  consumption: number;
  ecoScore: number;
  rating: 'green' | 'yellow' | 'red';
}
