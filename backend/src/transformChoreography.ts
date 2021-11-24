export function transformFramesToString(choreographyDto) {
  return {
    ...choreographyDto,
    frames: JSON.stringify(choreographyDto.frames),
  };
}

export function transformFramesToObject(choreographyDto) {
  return {
    ...choreographyDto,
    frames: JSON.parse(choreographyDto.frames),
  };
}
