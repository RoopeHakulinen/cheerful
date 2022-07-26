export interface Team {
    id: number;
    name: string;
}

export type TeamToBeCreated = Omit<Team, 'id'>;