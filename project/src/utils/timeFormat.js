export const formatTime = (isoString) => {
    try {
        if (!isoString || isoString === '0001-01-01T00:00:00Z') {
            return '--:--';
        }
        return isoString.substring(11, 16);
    }
    catch {
        return '--:--';
    }
};
export const calculateTimeRemaining = (isoString) => {
    try {
        if (!isoString || isoString === '0001-01-01T00:00:00Z') {
            return '--:--';
        }
        return isoString.substring(11, 16);
    }
    catch {
        return '--:--';
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
