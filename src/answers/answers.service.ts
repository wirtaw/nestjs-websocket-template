import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { Message } from './interfaces/Message';
import { Templates } from '../enum/messages';

@Injectable()
export class AnswersService {
  constructor(private readonly configService: ConfigService) {}
  async getAnswer(msg: Message): Promise<string> {
    let res = '';

    if (!msg?.value) {
      return Promise.reject(new Error('Empty message'));
    }
    const apiKey = this.configService.get<string>('OPEN_AI_KEY');
    const model = new OpenAI({ openAIApiKey: apiKey, temperature: 0.9 });

    if (msg.value.indexOf(Templates.hello) > -1) {
      res = Templates.hello;
    } else {
      if (
        msg.value.length <=
        Number(this.configService.get<string>('MINIMAL_SYMBOLS_OPEN_AI'))
      ) {
        return Templates.unknown;
      }

      res = await model.call(msg.value);
      if (res) {
        res = res.trim();
      }
      // console.dir(res);
    }
    return res;
  }
}
