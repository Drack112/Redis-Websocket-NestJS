import { WsException } from '@nestjs/websockets';

type WsExceptionType = 'BadRequest' | 'Unauthorized' | 'Unknown';

export class WsTypeException extends WsException {
  readonly type: WsExceptionType;

  constructor(type: WsExceptionType, message: string) {
    const error = {
      type,
      message,
    };

    super(error);
    this.type = type;
  }
}

export class WsBadRequestException extends WsTypeException {
  constructor(message: string) {
    super('BadRequest', message);
  }
}

export class WsUnauthorizedException extends WsTypeException {
  constructor(message: string) {
    super('Unauthorized', message);
  }
}
export class WsUnknownException extends WsTypeException {
  constructor(message: string) {
    super('Unknown', message);
  }
}
