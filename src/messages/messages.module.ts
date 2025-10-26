import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { AnswersService } from '../answers/answers.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MessagesGateway, AnswersService],
  imports: [ConfigModule],
})
export class MessagesModule {}
