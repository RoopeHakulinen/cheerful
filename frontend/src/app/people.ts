export interface Person {
  name: string;
  color: string;
}

export function createPerson(name: string): Person {
  return { name: name, color: '#5151b8' };
}
