export type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>;

export type PartiallyRequired<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
