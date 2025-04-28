import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsModule } from './listings/listings.module';
import { CategoriesModule } from './categories/categories.module';
import { SkillsModule } from './skills/skills.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    ListingsModule,
    SkillsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '88645684',
      database: 'sattapatta',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    ConversationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
