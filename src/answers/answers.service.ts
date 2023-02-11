import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/Message';

@Injectable()
export class AnswersService {
  getAnswer(msg: Message): Promise<string> {
    let res = '';

    if (!msg?.value) {
      return Promise.reject(new Error('Empty message'));
    }

    if (msg.value.indexOf('hello') > -1) {
      res = 'hello';
    } else {
      res = 'unknown';
    }
    return Promise.resolve(res);
  }
}
