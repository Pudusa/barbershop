import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.appointment.findMany({
      include: { service: true, barber: true },
    });
  }

  async create(dto: {
    customerName: string;
    customerEmail: string;
    serviceId: string;
    barberId: string;
    date: string;
    time: string;
    notes?: string;
  }) {
    return await this.prisma.$transaction(async (tx) => {
      const existing = await tx.appointment.findFirst({
        where: {
          barberId: dto.barberId,
          date: dto.date,
          time: dto.time,
          status: { not: 'cancelled' },
        },
      });

      if (existing) {
        throw new ConflictException(
          'This time slot is already booked for this barber. Please choose another time.',
        );
      }

      return tx.appointment.create({
        data: {
          customerName: dto.customerName,
          customerEmail: dto.customerEmail,
          serviceId: dto.serviceId,
          barberId: dto.barberId,
          date: dto.date,
          time: dto.time,
          notes: dto.notes,
        },
        include: { service: true, barber: true },
      });
    });
  }

  async cancel(id: string) {
    try {
      return await this.prisma.appointment.update({
        where: { id },
        data: { status: 'cancelled' },
      });
    } catch {
      throw new NotFoundException('Appointment not found');
    }
  }
}
