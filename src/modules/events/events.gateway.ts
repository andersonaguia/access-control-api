import { Inject, OnModuleInit, forwardRef } from '@nestjs/common';

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { ControllerAccessDoorDto } from './dto/controllerAccessDoor.dto';
import { DoorsService } from '../doors/services/doors.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  constructor(
    @Inject(forwardRef(() => DoorsService))
    private readonly doorsService: DoorsService,
  ) {}
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {}

  handleConnection(client: Socket) {
    console.log(
      `Client ${client.id} connected with EIO version: ${client.handshake.query.EIO}`,
    );
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  onModuleInit() {}

  @SubscribeMessage('initialstate')
  doorStatus(
    @MessageBody() data: any,
  ): Observable<WsResponse<any>> {
    if(data.doorId){
      this.doorsService.checkInitialStateByDoorId(+data.doorId);
    }    
    return 
  }

  @SubscribeMessage('doors')
  accessDoor(
    @MessageBody() data: ControllerAccessDoorDto,
  ): Observable<WsResponse<any>> {
    return from(this.doorsService.controllerAccess(data)).pipe(
      map((item) => ({ event: 'doors', data: item })),
    );
  }

  sendMessage(event: string, message: object) {
    try {
      this.server.emit(event, message);
      return true;
    } catch (error) {
      return {
        message: error,
      };
    }
  }
}
