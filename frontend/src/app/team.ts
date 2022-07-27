import { Choreography } from "./choreography";
import { Person } from "./people";

export interface Team {
    id: number;
    name: string;
    choreographies: Choreography[];
    people: Person[];
}

export type TeamToBeCreated = Omit<Team, 'id' | 'choreographies'>;