export function localPut<T extends string>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
}

export function localGet<T extends string>(key: string): T | null {
  try {
    return window.localStorage.getItem(key) as T;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function localRemove(key: string) {
  try {
    return window.localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}

export function localClear() {
  try {
    window.localStorage.clear();
  } catch (err) {
    console.error(err);
  }
}
