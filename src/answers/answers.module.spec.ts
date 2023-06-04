import { Test } from '@nestjs/testing';
import { AnswersModule } from './answers.module';
import { AnswersService } from './answers.service';

describe('AnswersModule', () => {
  it('should compile the answers module', async () => {
    const module = await Test.createTestingModule({
      imports: [AnswersModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(AnswersService)).toBeInstanceOf(AnswersService);
  });
});
