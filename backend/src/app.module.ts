import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { SkillsModule } from './skills/skills.module';
import { ConversationsModule } from './conversations/conversations.module';
import { Users } from './users/entities/users.entity';
import { Category } from './categories/entities/category.entity';
import { Skill } from './skills/entities/skill.entity';
import { MentorModule } from './mentor/mentor.module';
import { Mentor } from './mentor/entities/mentor.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
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
    import('@adminjs/nestjs').then(async ({ AdminModule }) => {
      const { Database, Resource } = await import('@adminjs/typeorm');
      await import('@adminjs/express');
      const { AdminJS } = await import('adminjs');

      AdminJS.registerAdapter({ Database, Resource });
      return AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [Users, Category, Skill, Mentor],
          },
          // auth: {
          //   authenticate,
          //   cookieName: 'adminjs',
          //   cookiePassword: 'secret',
          // },
          // sessionOptions: {
          //   resave: true,
          //   saveUninitialized: true,
          //   secret: 'secret',
          // },
        }),
      });
    }),
    UsersModule,
    CategoriesModule,
    SkillsModule,
    ConversationsModule,
    MentorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
