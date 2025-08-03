import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'sattapatta',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [process.cwd() + '/dist/migrations/*.js'],
});
