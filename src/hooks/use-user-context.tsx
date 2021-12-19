import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'app/store';
import { useGetCurrentUserQuery } from 'api/generated/graphql';

const HASURA_CLAIMS_URL = 'https://hasura.io/jwt/claims';

export const useUserContext = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [claim, setClaim] = useState<string | null>(null);

    useEffect(() => {
        const getTokenClaim = async () => {
            if (user && user.getIdTokenResult) {
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim = idTokenResult?.claims[HASURA_CLAIMS_URL] as Record<string, string>;
                setClaim(hasuraClaim['x-hasura-user-id']);
            }
        };
        getTokenClaim();
    }, [user]);

    const { data, loading, error } = useGetCurrentUserQuery({
        variables: {
            id: claim
        }
    });

    return {
        user: data?.users_by_pk,
        loading,
        error
    };
};
