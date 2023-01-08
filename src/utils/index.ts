export const enum2arr = (enumme: any) =>
  Object.keys(enumme).map((name) => enumme[name as keyof typeof enumme]);
