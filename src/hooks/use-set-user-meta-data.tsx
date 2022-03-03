import { Dispatch, RootState } from 'app/store';
import { getIsAfrica } from 'libs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGetCurrentUserLazyQuery } from 'api/generated/graphql';
import useGeolocation from './use-geolocation';

export const useSetUserMetaData = async () => {
    const [handleGetHasuraUser, { data: hasuraUserData }] = useGetCurrentUserLazyQuery();

    const { auth } = useSelector(({ dashboard, auth, payments }: RootState) => ({ dashboard, auth, payments }));

    const { user } = auth;
    const dispatch = useDispatch<Dispatch>();
    const {
        location: { countriesCodeByRegion }
    } = useGeolocation();
    useEffect(() => {
        if (user?.email) {
            handleGetHasuraUser({ variables: { email: user?.email ?? '' } });
            const hasuraUser = hasuraUserData?.users?.[0];
            const isUserInAfrica = getIsAfrica(hasuraUser?.country, countriesCodeByRegion?.Africa);
            dispatch.auth.setHasuraUser(hasuraUser);
            if (isUserInAfrica) {
                dispatch.dashboard.setViewState('local');
                dispatch.auth.updateAuthState({ ...auth, hasuraUser, isAfrica: isUserInAfrica });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasuraUserData, countriesCodeByRegion?.Africa, user]);
};
