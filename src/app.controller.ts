import { Controller, Get, UseGuards, Request } from "@nestjs/common";

@Controller("app")
export class appController {
  @Get("/")
  getMe(@Request() req: any) {
    return { message: "Everest Spirit Working" };
  }
}
