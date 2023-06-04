import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/Message';
import { Templates } from '../enum/messages';

@Injectable()
export class AnswersService {
  getAnswer(msg: Message): Promise<string> {
    let res = '';

    if (!msg?.value) {
      return Promise.reject(new Error('Empty message'));
    }

    if (msg.value.indexOf(Templates.hello) > -1) {
      res = Templates.hello;
    } else {
      res = Templates.unknown;
    }
    return Promise.resolve(res);
  }
}
