import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnswersService } from './answers.service';

@Module({
  providers: [AnswersService],
  imports: [ConfigModule],
})
export class AnswersModule {}
