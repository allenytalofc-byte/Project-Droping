import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DevicesService } from './devices.service';

@ApiTags('devices')
@Controller('devices')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar token do dispositivo para notificações' })
  async registerDevice(@Req() req: any, @Body() data: any) {
    return this.devicesService.registerDevice(
      req.user.id,
      data.device_token,
      data.device_type || 'web',
      data.device_name,
    );
  }
}
