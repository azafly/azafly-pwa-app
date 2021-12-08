import { useGetCurrentUserByEmailQuery } from 'api/generated/graphql';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

export const useUserContext = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { data: userData } = useGetCurrentUserByEmailQuery({
        variables: {
            email: user?.email ?? ''
        }
    });

    return userData?.users[0];
};
