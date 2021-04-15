import { isObject } from "./isObject";

export function safeMergeDeep<T extends Record<never, never>>(target: T, source: Partial<T>) {
  const copy: T = { ...target };

  for (const key in source) {
    if (copy.hasOwnProperty(key)) {
      if (isObject(copy[key])) {
        if (isObject(source[key])) {
          copy[key] = safeMergeDeep<T[Extract<keyof T, string>]>(copy[key], source[key]!);
        }

        continue;
      }

      if (source[key]) {
        copy[key] = source[key]!;
      }
    }
  }

  return copy;
}
