import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from './transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto) {
    return await this.prisma.transaction.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
      include: {
        bank: true,
        category: true,
      },
    });
  }

  async getAllTransaction() {
    return await this.prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        bank: true,
        category: true,
      },
    });
  }

  async getOneTransaction(id: number) {
    const trx = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        bank: true,
        category: true,
      },
    });

    if (!trx) throw new NotFoundException('Transaction not found');

    return trx;
  }

  async updateTransaction(id: number, data: UpdateTransactionDto) {
    await this.getOneTransaction(id);

    return await this.prisma.transaction.update({
      where: { id },
      data: {
        ...data
      },
      include: {
        bank: true,
        category: true,
      },
    });
  }

  async deleteTransaction(id: number) {
    await this.getOneTransaction(id); 

    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
