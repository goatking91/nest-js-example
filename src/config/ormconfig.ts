import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'q12we34r',
  database: 'test',
  entities: ['./src/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['./src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});

export default dataSource;
