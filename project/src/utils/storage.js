const STORAGE_KEY = 'phantom_tour_history';
export const saveTourToHistory = (entry) => {
    try {
        const history = getTourHistory();
        history.push(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
    catch (error) {
        console.error('Error saving tour to history:', error);
    }
};
export const getTourHistory = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
    catch (error) {
        console.error('Error reading tour history:', error);
        return [];
    }
};
export const clearTourHistory = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    }
    catch (error) {
        console.error('Error clearing tour history:', error);
    }
};
export const formatHistoryDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
