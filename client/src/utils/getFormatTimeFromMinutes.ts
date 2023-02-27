type FormatTime = {
    minutes: string,
    hours: string
}

export const getFormatTimeFromMinutes = (initMinutes: number): FormatTime => {
    const hours = Math.floor(initMinutes / 60);
    const minutes = initMinutes % 60;

    const formatHours = hours < 10 ? "0" + hours : hours.toString();
    const formatMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

    return {
        minutes: formatMinutes,
        hours: formatHours
    }
}
