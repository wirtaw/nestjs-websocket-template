import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Module({
  providers: [AnswersService],
})
export class AnswersModule {}
