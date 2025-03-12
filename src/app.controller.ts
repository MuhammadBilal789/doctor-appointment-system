import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get system health status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'System is up and running',
    schema: {
      example: {
        message: 'OK',
        uptime: 12345.67,
        timestamp: '2025-03-04T12:34:56.789Z',
      },
    },
  })
  getHealthStatus(): Record<string, any> {
    return this.appService.getHealthStatus();
  }
}
