import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHealthStatus(): Record<string, any> {
    return {
      message: "OK",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
