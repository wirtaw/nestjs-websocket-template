import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { AnswersModule } from './answers/answers.module';
import config from './conf/configuration';

const envFilePath = process.env.NODE_ENV === 'test' ? '.env.test' : undefined;

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      envFilePath: envFilePath,
      ignoreEnvVars: process.env.NODE_ENV === 'test',
      isGlobal: true,
      load: [config],
    }),
    MessagesModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
