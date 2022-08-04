export function updateAllAttributes(source: any, target: any): void {
    Object.keys(source).forEach(key => {
      target[key] = source[key];
    });
}