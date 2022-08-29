import { verify, sign, decode, SignOptions } from 'jsonwebtoken';

import { JwtOptions, JwtVerifyOptions } from './options';

export class JwtService {
  constructor(private readonly options: JwtOptions) {}

  async verifyAsync<T>(options: JwtVerifyOptions): Promise<T> {
    const { token } = options;
    const payload = verify(token, this.secret) as T;
    return payload;
  }

  async signAsync(payload: string | object | Buffer, options: SignOptions | undefined = undefined): Promise<string> {
    const signature = sign(payload, this.secret, options);

    return signature;
  }

  get secret() {
    return this.options.secret;
  }
}
