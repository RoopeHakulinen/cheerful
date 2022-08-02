export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export type UserToBeCreated = Omit<User, 'id'>;