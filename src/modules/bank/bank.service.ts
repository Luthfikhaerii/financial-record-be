import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BankService {
  constructor(private readonly prisma: PrismaService) {}

  async createBank(data: {
    account_number: string;
    bank_name: string;
    balance?: number;
    account_holder: string;
  }) {
    return this.prisma.bank.create({
      data,
    });
  }

  async getAllBanks() {
    return this.prisma.bank.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getOneBank(id: number) {
    const bank = await this.prisma.bank.findUnique({
      where: { id },
      include: { transactions: true },
    });

    if (!bank) throw new NotFoundException('Bank not found');

    return bank;
  }

  async updateBank(
    id: number,
    data: {
      account_number?: string;
      bank_name?: string;
      balance?: number;
      account_holder?: string;
    },
  ) {
    await this.getOneBank(id);

    return this.prisma.bank.update({
      where: { id },
      data,
    });
  }

  async deleteBank(id: number) {
    await this.getOneBank(id);

    return this.prisma.bank.delete({
      where: { id },
    });
  }
}
