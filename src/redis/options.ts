import { Redis, RedisOptions } from 'ioredis';
import { ModuleMetadata, FactoryProvider } from '@nestjs/common';

export const IORedisKey = 'IoRedis';

export type RedisModuleOptions = {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
};

export type RedisAsyncModuleOptions = {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;
