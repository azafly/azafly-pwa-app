import { decrypt } from 'libs';

import { axiosClient, BASE_URL } from '.';

const CARDS_URL = `${BASE_URL}/cards`;

const getEncryptedData = (cardId: string) => {
    const url = `${CARDS_URL}/${cardId}/secure-details`;
    return axiosClient().get<{ data: any }>(`${url}`);
};
export function getEncryptedCardDetails(cardId: string) {
    getEncryptedData(cardId)
        .then(({ data: { data } }) => decrypt(data))
        .catch(() => null);
}
