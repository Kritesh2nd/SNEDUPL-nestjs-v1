import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err: any, user: any, info: any) {
    // Token expired
    if (info?.name === "TokenExpiredError") {
      throw new UnauthorizedException({
        success: false,
        errorCode: "TOKEN_EXPIRED",
        message: "Your session has expired. Please login again.",
      });
    }

    // Invalid signature / malformed token
    if (info?.name === "JsonWebTokenError") {
      throw new UnauthorizedException({
        success: false,
        errorCode: "INVALID_TOKEN",
        message: "Invalid authentication token.",
      });
    }

    // No token provided
    if (info?.message === "No auth token") {
      throw new UnauthorizedException({
        success: false,
        errorCode: "TOKEN_MISSING",
        message: "Authentication token is required.",
      });
    }

    // Generic unauthorized
    if (err || !user) {
      throw new UnauthorizedException({
        success: false,
        errorCode: "UNAUTHORIZED",
        message: "Unauthorized access.",
      });
    }

    return user;
  }
}
