export function transformChoreographyDtoToMatchDatabase(choreographyDto) {
  return {
    ...choreographyDto,
    people: choreographyDto.people.map((choreographyPerson) => ({
      ...choreographyPerson,
      person: { id: choreographyPerson.personId },
    })),
  };
}
