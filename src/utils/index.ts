export const getTransactionIdFromUrlParams = (...param: any) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param)
}

