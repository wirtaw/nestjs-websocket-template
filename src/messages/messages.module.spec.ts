import { Test } from '@nestjs/testing';
import { MessagesGateway } from './messages.gateway';
import { AnswersService } from '../answers/answers.service';

describe('MessagesModule', () => {
  it('should compile the messages module', async () => {
    const module = await Test.createTestingModule({
      providers: [MessagesGateway, AnswersService],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(MessagesGateway)).toBeInstanceOf(MessagesGateway);
    expect(module.get(AnswersService)).toBeInstanceOf(AnswersService);
  });
});
