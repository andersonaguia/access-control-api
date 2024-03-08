import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    private readonly app,
    private readonly configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: any): any {
    port = this.configService.get<number>('socketPort') || 8001;
    return super.createIOServer(port, options);
  }
}
