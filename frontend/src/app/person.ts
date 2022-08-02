export interface Person {
  name: string;
  id: number;
}

export type PersonToBeCreated = Omit<Person, 'id'>;