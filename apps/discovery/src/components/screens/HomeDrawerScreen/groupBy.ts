export default function groupBy<T, K extends keyof T>(xs: Array<T>, key: K) {
  type GroupKey = T[K] extends string ? T[K] : never;
  type Result = Record<string, Array<T>>;
  
  return xs.reduce(function (rv, x) {
    const groupKey = x[key] as unknown as string;
    (rv[groupKey] = rv[groupKey] || []).push(x);
    return rv;
  }, {} as Result) as T[K] extends string ? Record<T[K], Array<T>> : never;
}
