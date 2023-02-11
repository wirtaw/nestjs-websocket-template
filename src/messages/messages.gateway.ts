import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { AnswersService } from '../answers/answers.service';
import { Message } from '../answers/interfaces/Message';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  private readonly logger = new Logger(MessagesGateway.name);
  private readonly answers = new AnswersService();
  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: string): Observable<WsResponse<number>> {
    this.logger.log('events: ', data);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    this.logger.log('identity: ', data);
    return Promise.resolve(data);
  }

  @SubscribeMessage('message')
  async message(@MessageBody() data: Message): Promise<WsResponse<string>> {
    this.logger.log('message: ', data);

    const answer = await this.answers.getAnswer(data);

    return { event: 'message', data: answer };
  }
}
