/**
 * Check if an object is empty (has no defined keys)
 */
export function isObjectEmpty<T extends {}>(obj: T): boolean {
  // tslint:disable:no-for-in
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      return false;
    }
  }
  return true;
}
