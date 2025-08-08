import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { SkillsModule } from './skills/skills.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MentorModule } from './mentor/mentor.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { ChatModule } from './chat/chat.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '0.0.0.0',
      port: 3306,
      username: 'root',
      password: '88645684',
      database: 'sattapatta',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    UsersModule,
    CategoriesModule,
    SkillsModule,
    ConversationsModule,
    MentorModule,
    ChatModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
