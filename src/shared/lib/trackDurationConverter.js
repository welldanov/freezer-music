// Функция для конвертации секунд в часы, минуты, секунды
export function trackDurationConverter(duration) {
    let minutes = Math.floor(Math.round(duration) / 60) > 9 ? Math.floor(Math.round(duration) / 60) : `0${Math.floor(Math.round(duration) / 60)}`;
    let seconds = (Math.round(duration) % 60) > 9 ? (Math.round(duration) % 60) : `0${(Math.round(duration) % 60)}`
    return `${minutes}:${seconds}`;
}

export function allTracksDurationConverter(duration) {
    let hours = Math.floor(Math.round(duration) / 3600) > 0 ? `${Math.floor(Math.round(duration) / 3600)} hrs` : "";
    let minutes;
    duration %= 3600;
    if (duration !== 0) {
        minutes = Math.floor(Math.round(duration) / 60) > 0 ? `${Math.floor(Math.round(duration) / 60)} minutes` : `1 minute`;
    } else {
        minutes = "";
    }
    return `${hours} ${minutes}`;
}