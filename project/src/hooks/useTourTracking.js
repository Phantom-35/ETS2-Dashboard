import { useState, useCallback, useEffect } from 'react';
import { saveTourToHistory, formatHistoryDate } from '../utils/storage';
export const useTourTracking = (data) => {
    const [tour, setTour] = useState(null);
    const [report, setReport] = useState(null);
    const [showReport, setShowReport] = useState(false);
    useEffect(() => {
        if (!data)
            return;
        const currentIncome = data.job?.income || 0;
        const currentOdometer = data.truck?.odometer || 0;
        const currentFuel = data.truck?.fuel || 0;
        const currentSpeed = data.truck?.speed || 0;
        const currentThrottle = data.truck?.userThrottle || 0;
        const cargoName = data.trailer?.name || 'Unbekannt';
        const sourceCity = data.job?.sourceCity || '-';
        const destinationCity = data.job?.destinationCity || '-';
        if (currentIncome > 0 && !tour) {
            setTour({
                startOdometer: currentOdometer,
                startFuel: currentFuel,
                lastFuelLevel: currentFuel,
                totalConsumed: 0,
                throttleValues: currentSpeed > 1 ? [currentThrottle] : [],
                startTime: Date.now(),
                cargoName,
                sourceCity,
                destinationCity,
            });
        }
        else if (currentIncome > 0 && tour) {
            setTour((prev) => {
                if (!prev)
                    return prev;
                let newTotalConsumed = prev.totalConsumed;
                if (currentFuel < prev.lastFuelLevel) {
                    newTotalConsumed += prev.lastFuelLevel - currentFuel;
                }
                const newThrottleValues = currentSpeed > 1
                    ? [...prev.throttleValues, currentThrottle]
                    : prev.throttleValues;
                return {
                    ...prev,
                    lastFuelLevel: currentFuel,
                    totalConsumed: newTotalConsumed,
                    throttleValues: newThrottleValues,
                };
            });
        }
        else if (currentIncome === 0 && tour) {
            const distanceDriven = currentOdometer - tour.startOdometer;
            const fuelConsumed = tour.totalConsumed;
            const averageConsumption = distanceDriven > 0 ? (fuelConsumed / distanceDriven) * 100 : 0;
            const validThrottleValues = tour.throttleValues.filter(v => v > 0);
            const fullThrottleCount = validThrottleValues.filter((v) => v > 0.8).length;
            const fullThrottlePercentage = validThrottleValues.length > 0
                ? (fullThrottleCount / validThrottleValues.length) * 100
                : 0;
            let ecoRating = 'green';
            let ecoScore = 100;
            if (fullThrottlePercentage > 40) {
                ecoRating = 'red';
                ecoScore = Math.max(20, 100 - fullThrottlePercentage);
            }
            else if (fullThrottlePercentage > 20) {
                ecoRating = 'yellow';
                ecoScore = Math.max(50, 100 - fullThrottlePercentage * 1.5);
            }
            else {
                ecoRating = 'green';
                ecoScore = 100 - fullThrottlePercentage;
            }
            const newReport = {
                distanceDriven: Math.max(0, distanceDriven),
                fuelConsumed: Math.max(0, fuelConsumed),
                averageConsumption: Math.max(0, averageConsumption),
                ecoScore: Math.round(ecoScore),
                ecoRating,
                fullThrottlePercentage: Math.round(fullThrottlePercentage),
                cargoName: tour.cargoName,
                sourceCity: tour.sourceCity,
                destinationCity: tour.destinationCity,
                timestamp: Date.now(),
            };
            setReport(newReport);
            setShowReport(true);
            const historyEntry = {
                date: formatHistoryDate(Date.now()),
                cargo: tour.cargoName,
                distance: Math.max(0, distanceDriven),
                consumption: Math.max(0, fuelConsumed),
                ecoScore: Math.round(ecoScore),
                rating: ecoRating,
            };
            saveTourToHistory(historyEntry);
            setTour(null);
        }
    }, [data, tour]);
    const closeReport = useCallback(() => {
        setShowReport(false);
        setReport(null);
    }, []);
    return { tour, report, showReport, closeReport };
};
