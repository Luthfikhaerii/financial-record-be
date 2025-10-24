import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DebtService {
  constructor(private readonly prisma: PrismaService) {}

  async createDebt(data: {
    description: string;
    amount: number;
    date: string | Date;
  }) {
    return this.prisma.debt.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
  }

  async getAllDebts() {
    return this.prisma.debt.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getOneDebt(id: number) {
    const debt = await this.prisma.debt.findUnique({
      where: { id },
    });

    if (!debt) throw new NotFoundException('Debt not found');

    return debt;
  }

  async updateDebt(
    id: number,
    data: {
      description?: string;
      amount?: number;
      date?: string | Date;
    },
  ) {
    await this.getOneDebt(id);

    return this.prisma.debt.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  }

  async deleteDebt(id: number) {
    await this.getOneDebt(id);

    return this.prisma.debt.delete({
      where: { id },
    });
  }
}
