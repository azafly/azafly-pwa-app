import { useInsertNewUserMutation } from 'api/generated/graphql';
import { v4 as uuidv4 } from 'uuid';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    firebase_id: string;
}
export const useInsertNewUserOnEmailSignUp = () => {
    const user: User = JSON.parse(localStorage.getItem('user') as string);
    const { firstName, lastName, email, firebase_id } = user;
    const displayName = `${firstName} ${lastName}`;
    const [insertNewUserMutation] = useInsertNewUserMutation({
        variables: { display_name: displayName, email, email_verified: false, id: uuidv4(), firebase_id }
    });

    return { insertNewUserMutation };
};
