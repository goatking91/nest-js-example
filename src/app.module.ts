import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logger/logger.middleware';
import { Logger2Middleware } from './logger/logger.middleware2';
import { UsersController } from './users/users.controller';
import authConfig from './config/authConfig';
import { ExceptionModule } from './exception/exception.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST, //'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME, //'root',
      password: process.env.DATABASE_PASSWORD, //'q12we34r',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE), // true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
    }),
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.Console({
    //       level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         nestWinstonModuleUtilities.format.nestLike('MyApp', {
    //           prettyPrint: true,
    //         }),
    //       ),
    //     }),
    //   ],
    // }),
    ExceptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, Logger2Middleware)
      .exclude({ path: 'users', method: RequestMethod.GET })
      .forRoutes(UsersController);
  }
}
