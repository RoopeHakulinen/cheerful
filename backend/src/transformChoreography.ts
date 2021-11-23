export function transformChoreographyDtoToMatchDatabase(choreographyDto) {
  return {
    ...choreographyDto,
    frames: JSON.stringify(choreographyDto.frames),
    people: choreographyDto.people.map((choreographyPerson) => ({
      ...choreographyPerson,
      person: { id: choreographyPerson.personId },
    })),
  };
}
