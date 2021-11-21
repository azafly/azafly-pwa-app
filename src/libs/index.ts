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

export function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}

export const formatFirstName = (name: string) => {
    const [surName, firstName] = name.split(' ');
    return !firstName ? surName : firstName;
};
