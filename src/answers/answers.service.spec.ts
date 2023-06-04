import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';
import { Message } from './interfaces/Message';
import { Templates } from '../enum/messages';

describe('AnswersService', () => {
  let service: AnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswersService],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAnswer', () => {
    it("shouldn't get answer (undefined)", async () => {
      const msg: Message = { value: undefined };
      try {
        await service.getAnswer(msg);
      } catch (e) {
        expect(e.toString()).toEqual('Error: Empty message');
      }
    });

    it("shouldn't get answer (null)", async () => {
      const msg: Message = { value: null };
      try {
        await service.getAnswer(msg);
      } catch (e) {
        expect(e.toString()).toEqual('Error: Empty message');
      }
    });

    it("shouldn't get answer if not message struct", async () => {
      try {
        await service.getAnswer(null);
      } catch (e) {
        expect(e.toString()).toEqual('Error: Empty message');
      }
    });

    it(`should get answer hello on ${Templates.hello}`, async () => {
      const msg: Message = { value: Templates.hello };
      const res = await service.getAnswer(msg);
      expect(res).toEqual(Templates.hello);
    });

    it('should get answer hello on ?', async () => {
      const msg: Message = { value: '?' };
      const res = await service.getAnswer(msg);
      expect(res).toEqual(Templates.unknown);
    });
  });
});
