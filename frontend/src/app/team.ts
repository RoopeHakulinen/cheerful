import { Choreography } from "./choreography";
import { Person, PersonToBeCreated } from "./person";
import { User } from "./user";

export interface Team {
    id: number;
    name: string;
    choreographies: Choreography[];
    users: User[]; 
    people: PersonToBeCreated[];
}

export type TeamToBeCreated = Omit<Team, 'id' | 'choreographies'>;