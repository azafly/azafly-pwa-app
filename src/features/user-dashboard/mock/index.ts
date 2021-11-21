export const fakeWalletAPI = () => {
    return new Promise((resolve, reject) => {
        const wallet = [
            {
                balance: 100.78,
                currency: 'NGN'
            },
            {
                balance: 100.78,
                currency: 'EUR'
            }
        ];
        setTimeout(() => {
            resolve(wallet);
        }, 550);
    });
};
let loading = false;

export const fetchWallet = async () => {
    loading = true;
    try {
        const wallet = await fakeWalletAPI();

        loading = false;
        return wallet;
    } catch (error) {
        loading = false;
    }
};
