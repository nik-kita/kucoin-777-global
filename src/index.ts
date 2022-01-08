import { Redis as TRedis } from 'ioredis';

export class KucoinGlobal<T extends Record<string, any> = { [key: string]: any }> {
  private constructor(private sub: TRedis, public state: Partial<T> = {}) {
    sub.on('message', (channel, message) => {
      this.state = { ...this.state, ...JSON.parse(message)};
    });
  }

  public static async connect(sub: TRedis) {
    await sub.subscribe('to:global');
    return new KucoinGlobal(sub);
  }
}