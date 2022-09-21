import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './config/database.configuration';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DATABASE_HOST, //'localhost',
    //   port: 3306,
    //   username: process.env.DATABASE_USERNAME, //'root',
    //   password: process.env.DATABASE_PASSWORD, //'q12we34r',
    //   database: 'test',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE), // true,
    //   migrations: [__dirname + '/migrations/*{.ts,.js}'],
    //   migrationsTableName: 'migrations',
    // }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
