import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Post()
  create(
    @Body()
    dto: {
      customerName: string;
      customerEmail: string;
      serviceId: string;
      barberId: string;
      date: string;
      time: string;
      notes?: string;
    },
  ) {
    return this.appointmentsService.create(dto);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(id);
  }
}
