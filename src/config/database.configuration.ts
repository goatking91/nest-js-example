import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
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
    };
  }
}
