// socket.gateway.ts
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleEmitSocket({ data, event, to }) {
    if (event === 'message') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }
    if (event === 'blockUser') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'order') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }
    if (event === 'blockProduct') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }
  }

  sendToClient(clientId: string, event: string, data: any) {
    // console.log('clientId', clientId);
    this.server.emit(event, data);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    // console.log('>>>>', data);

    return this.sendToClient(socket.id, 'message', data);
  }

  @SubscribeMessage('order')
  async handleOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    // console.log('>>>>', data);

    return this.sendToClient(socket.id, 'order', data);
  }

  @SubscribeMessage('blockUser')
  async handleBlockUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    // console.log('>>>>', data);

    return this.sendToClient(socket.id, 'blockUser', data);
  }

  @SubscribeMessage('blockProduct')
  async handleBlockProduct(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    // console.log('>>>>', data);

    return this.sendToClient(socket.id, 'blockProduct', data);
  }

  afterInit(socket: Socket): any {}

  async handleConnection(socket: Socket) {
    console.log('connect', socket.id);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnect', socket.id);
  }
}
