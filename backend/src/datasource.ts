import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: '0.0.0.0',
  port: 3306,
  username: 'root',
  password: '88645684',
  database: 'sattapatta',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [process.cwd() + '/dist/migrations/*.js'],
});
