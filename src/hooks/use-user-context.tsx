import { RootState } from 'app/store';
import { useEffect, useState } from 'react';
import { useGetCurrentUserQuery } from 'api/generated/graphql';
import { useSelector } from 'react-redux';

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

    const { data } = useGetCurrentUserQuery({
        variables: {
            id: claim
        }
    });

    return data?.users_by_pk;
};
