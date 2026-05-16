import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException ? exception.getResponse() : null;

    const normalized =
      typeof exceptionResponse === "object" && exceptionResponse !== null
        ? (exceptionResponse as Record<string, any>)
        : null;

    const message =
      normalized?.message || exceptionResponse || "Internal server error";

    const errorCode = normalized?.errorCode || "INTERNAL_SERVER_ERROR";

    // this.logger.error(
    //   `${request.method} ${request.url} - ${status}`,
    //   exception instanceof Error ? exception.stack : String(exception),
    // );
    this.logger.error(
      `${request.method} ${request.url} - ${status}`,
      exception instanceof Error
        ? exception.stack
        : JSON.stringify(exception, null, 2),
    );
    response.status(status).json({
      success: false,
      statusCode: status,
      errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof message === "string"
          ? message
          : Array.isArray(message)
            ? message.join(", ")
            : message,
    });
  }
}
