import Dexie, { Table } from 'dexie';

interface User {
    isAuth: boolean;
    id: string;
}

class UserDB extends Dexie {
    user!: Table<User>;

    constructor() {
        super('userDB');
        this.version(2).stores({
            user: `
        id,
        isAuth`
        });
    }
}

export const db = new UserDB();
