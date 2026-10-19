import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BarbersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.barber.findMany({
      include: {
        appointments: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.barber.findUnique({
      where: { id },
      include: {
        appointments: true,
      },
    });
  }
}
