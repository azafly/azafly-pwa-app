export * from './crypto';
export const getTransactionIdFromUrlParams = (...param: any) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

export const transformCase = (text: string) => {
    return text
        .split('_')
        .map(it => `${it[0].toUpperCase()}${it.substring(1)} `)
        .join('');
};

interface IFormatCurrency {
    countryCode: string;
    amount: number;
    currency: string;
}

export const formatCurrency = ({ countryCode, amount, currency }: IFormatCurrency) => {
    return new Intl.NumberFormat(`en-${countryCode}`, { style: 'currency', currency }).format(amount);
};

export function delay(delayTime = 1500) {
    return new Promise(res => setTimeout(res, delayTime));
}

export const formatFirstName = (name: string) => {
    const [surName, firstName] = name.split(' ');
    return !firstName ? surName : firstName;
};

export const debounce = (callback: any, wait: number) => {
    let timeoutId: any = null;
    return (...args: any) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            // eslint-disable-next-line prefer-spread
            callback.apply(null, args);
        }, wait);
    };
};

export const isAllValueTruthy = (...args: any) => {
    const isTruthy = (values: any) => values.every((arg: unknown) => arg !== null && typeof arg !== undefined);
    return isTruthy([...args]);
};

export const getIsAfrica = (country?: string, africa?: Record<string, any>) => {
    if (!country || !africa) return false;
    return country in africa;
};
