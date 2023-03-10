import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from './redis/redis.module';

export const CustomRedisModule = RedisModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (ConfigService: ConfigService) => {
    const logger = new Logger('RedisModule');

    return {
      connectionOptions: {
        host: ConfigService.get('REDIS_HOST'),
        port: ConfigService.get('REDIS_PORT'),
      },
      onClientReady: (client) => {
        logger.log('Redis client ready');

        client.on('error', (err) => {
          logger.error('Redis client Error: ', err);
        });

        client.on('connect', () => {
          logger.log(
            `Connected to redis on ${client.options.host}:${client.options.port}`,
          );
        });
      },
    };
  },
  inject: [ConfigService],
});

export const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: parseInt(configService.get<string>('POLL_DURATION')),
    },
  }),
  inject: [ConfigService],
});
