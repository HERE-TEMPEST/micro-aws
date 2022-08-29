import { config } from 'dotenv';
import { GetEnvValueOptions } from '../core';

export class ConfigService {
  private readonly env: { [name: string]: string };

  constructor(private readonly envPath: string | null = null) {
    const environment = config({
      path: this.envPath,
    });

    if (environment.error) {
      throw new Error(`Error in parsing env file ${environment.error}`);
    }
    this.env = environment.parsed;
  }

  get<T>(key: string, options: GetEnvValueOptions<T> | undefined = undefined): T | undefined {
    if (!this.env) {
      return undefined;
    }

    const value = this.env[key] || process.env[key];

    if (!value) {
      return undefined;
    }

    if (options && options.transform) {
      return options.transform(value);
    }

    return value as unknown as T;
  }
}
