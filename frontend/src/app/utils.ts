export function updateAllAttributes(source: any, target: any): void {
  Object.keys(source).forEach((key) => {
    target[key] = source[key];
  });
}

export function createDeepCopy<T>(input: T): T {
  return JSON.parse(JSON.stringify(input));
}
