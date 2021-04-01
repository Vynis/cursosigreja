export const dateToString = (date: Date) => {
    if (!date) return '';
    if (typeof date === "string") date = new Date(date);
    const { dia, mes, ano } = { dia: date.getDate(), mes: date.getMonth() + 1, ano: date.getFullYear() };
    return `${ajusteZeros(dia)}/${ajusteZeros(mes)}/${ano}`;
}

export const dateTimeToString = (date: Date) => {
    if (!date) return '';
    if (typeof date === "string") date = new Date(date);
    const { dia, mes, ano } = { dia: date.getDate(), mes: date.getMonth() + 1, ano: date.getFullYear() };
    return `${ajusteZeros(dia)}/${ajusteZeros(mes)}/${ano} ${timeToString(date)}`;
}

export const dateTimeToStringUS = (date: Date) => {
    if (!date) return '';
    if (typeof date === "string") date = new Date(date);
    const { dia, mes, ano } = { dia: date.getDate(), mes: date.getMonth() + 1, ano: date.getFullYear() };
    return `${ano}/${ajusteZeros(mes)}/${ajusteZeros(dia)} ${timeToString(date)}`;
}

export const timeToString = (date: Date) => {
    if (!date) return '';
    if (typeof date === "string") date = new Date(date);
    return `${ajusteZeros(date.getHours())}:${ajusteZeros(date.getMinutes())}:${ajusteZeros(date.getSeconds())}`;
}

export const timeToStringHHMM = (date: Date) => {
    if (!date) return '';
    if (typeof date === "string") date = new Date(date);
    return `${ajusteZeros(date.getHours())}:${ajusteZeros(date.getMinutes())}`;
}

export const stringToTime = (hora: string) => {
    if (!hora) return null;

    try {
        const data = new Date();
        const valores = hora.split(':');
        data.setSeconds(0);
        data.setHours(Number.parseInt(valores[0]));
        data.setMinutes(Number.parseInt(valores[1]));
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const stringToDate = (data: string): Date => {
    if (!data) return null;
    try {
        const [dia, mes, ano] = data.split('/');
        const [diaNumber, mesNumber, anoNumber] = [Number(dia), Number(mes) - 1, Number(ano)];

        const dataDate = new Date(anoNumber, mesNumber, diaNumber);

        if (dataDate.getDate() == diaNumber && dataDate.getMonth() == mesNumber && dataDate.getFullYear() == anoNumber) {
            return dataDate;
        }
    } catch {

        return null;
    }
    return null;
}

export const stringDateTimeToDate = (data: string): Date => {
    if (!data) return null;
    try {
        const [dia, mes, anoTime] = data.split('/');
        const [ano, timespan] = anoTime.split(' ');

        const [diaNumber, mesNumber, anoNumber] = [Number(dia), Number(mes) - 1, Number(ano)];

        const dataDate = new Date(anoNumber, mesNumber, diaNumber);

        if (dataDate.getDate() == diaNumber && dataDate.getMonth() == mesNumber && dataDate.getFullYear() == anoNumber) {
            return dataDate;
        }
    } catch {

        return null;
    }
    return null;
}

const ajusteZeros = (n: number) => ('00' + n).slice(-2);


export const horaEhValida = (time: string): boolean => {
    if (!time) {
        return false;
    }

    let regex = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])(:([0-5]?[0-9]))?$');
    if (!regex.test(time)) {
        return false;
    }

    return true;
};