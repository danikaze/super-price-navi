/**
 * Return a new object only with the new keys that pass the filter,
 * being the filter called for each key of the object
 */
export function filterObject<T extends {}>(
  obj: T,
  filter: (data: unknown, key: keyof T) => boolean
): Partial<T> {
  return Object.keys(obj).reduce((res, key) => {
    const data = obj[key as keyof T];
    if (filter(data, key as keyof T)) {
      res[key as keyof T] = data;
    }
    return res;
  }, {} as T);
}
