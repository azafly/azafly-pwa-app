import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch, RootState } from 'app/store';
import { useGetCurrentUserQuery } from 'api/generated/graphql';

const HASURA_CLAIMS_URL = 'https://hasura.io/jwt/claims';

export const useUserContext = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [claim, setClaim] = useState<string | null>(null);

    const dispatch = useDispatch<Dispatch>();

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

    useEffect(() => {
        if (data?.users_by_pk) {
            dispatch.auth.setHasuraUser(data.users_by_pk);
        }
    }, [data, dispatch.auth]);

    return {
        user: data?.users_by_pk,
        loading,
        error
    };
};
