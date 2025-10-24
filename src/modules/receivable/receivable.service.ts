import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReceivableService {
  constructor(private readonly prisma: PrismaService) {}

  async createReceivable(data: {
    description: string;
    amount: number;
    date: Date | string;
  }) {
    return this.prisma.receivable.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
  }

  async getAllReceivables() {
    return this.prisma.receivable.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getOneReceivable(id: number) {
    const receivable = await this.prisma.receivable.findUnique({
      where: { id },
    });

    if (!receivable) throw new NotFoundException('Receivable not found');

    return receivable;
  }

  async updateReceivable(
    id: number,
    data: {
      description?: string;
      amount?: number;
      date?: Date | string;
    },
  ) {
    await this.getOneReceivable(id); 

    return this.prisma.receivable.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  }

  async deleteReceivable(id: number) {
    await this.getOneReceivable(id);

    return this.prisma.receivable.delete({
      where: { id },
    });
  }
}
