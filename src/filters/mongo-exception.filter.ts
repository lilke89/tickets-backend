import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter<MongoError> {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = HttpStatus.BAD_REQUEST;

    switch (exception.code) {
      case 11000:
        response
          .status(status)
          .json({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: 'User already exists!',
          });
        break;
      default:
        response
          .status(status)
          .json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal server error!',
          });
    }
  }
}
