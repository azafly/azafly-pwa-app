import { useLocation } from 'react-router-dom';

export const useURLParams = (searchParam: string) => {
    const query = new URLSearchParams(useLocation().search);

    return query.get(searchParam);
};
