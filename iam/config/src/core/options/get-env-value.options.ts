export interface GetEnvValueOptions<T> {
  transform: ((value: string) => T) | undefined;
}
