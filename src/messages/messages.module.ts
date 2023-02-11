import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { AnswersService } from '../answers/answers.service';

@Module({
  providers: [MessagesGateway, AnswersService],
})
export class MessagesModule {}
